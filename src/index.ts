// Импортируйте необходимые модули (например, если вы используете Webpack)
import './scss/styles.scss';
import { IAppApi, IProduct, IProductCatalog, IProductItem, TId, TOrderSuccess } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/appApi';
import { EventEmitter } from './components/base/events';
import { ProductItem } from './components/model/productData';
import { ShoppingCart } from './components/model/basketData';
import { Order } from './components/model/orderData';
import { Success } from './components/model/successData';
import { FormOrder } from './components/view/orderForm';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductItemCatalogue } from './components/view/productCatalog';
import { ProductPreview } from './components/view/ProductPreview';
import { Page } from './components/view/page';
import { CardModal } from './components/view/vmodal';
import { Modal } from './components/view/modal';
import { ProductInBasket } from './components/view/productInBasket';
import { Basket } from './components/view/basket';
import { FormContacts } from './components/view/formContact';
import { VSuccess } from './components/view/succes';

// Инициализация данных
const events = new EventEmitter();
const productData = new ProductItem(events);
const basketData = new ShoppingCart(events);
const orderData = new Order(events);
const orderSuccess = new Success(events);

// Инициализация элементов представления
const elements = {
    containerPage: ensureElement<HTMLElement>('.page'),
    containerModal: ensureElement<HTMLElement>('#modal-container'),
    templates: {
        cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
        cardCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
        cardBasket: ensureElement<HTMLTemplateElement>('#card-basket'),
        basket: ensureElement<HTMLTemplateElement>('#basket'),
        order: ensureElement<HTMLTemplateElement>('#order'),
        contacts: ensureElement<HTMLTemplateElement>('#contacts'),
        success: ensureElement<HTMLTemplateElement>('#success')
    }
};

// Инициализация представлений
const views = {
    page: new Page(elements.containerPage, events),
    modal: new Modal(elements.containerModal, events),
    cardModal: new CardModal(elements.containerModal, events),
    cardPreview: new ProductPreview(cloneTemplate(elements.templates.cardPreview), events),
    basket: new Basket(cloneTemplate(elements.templates.basket), events),
    formOrder: new FormOrder(cloneTemplate(elements.templates.order), events),
    formContacts: new FormContacts(cloneTemplate(elements.templates.contacts), events),
    success: new VSuccess(cloneTemplate(elements.templates.success), events)
};

// Получение экземпляра API
const api: IAppApi = new AppApi(CDN_URL, API_URL);

// Загрузка данных о товарах и обновление интерфейса
const loadProducts = async () => {
    try {
        const data = await api.getCards();
        productData.products = data;
        events.emit('cards:changed', data);
    } catch (error) {
        console.error('Error loading products:', error);
    }
};

// Обработка изменения данных о товарах
events.on('cards:changed', (products: IProductItem[]) => {
    const productsList = products.map(product => {
        try {
            const viewProduct = new ProductItemCatalogue<IProductCatalog>(cloneTemplate(elements.templates.cardCatalog), events);
            const renderedProduct = viewProduct.render(product);

            // Добавление обработчика клика для открытия модального окна
            renderedProduct.addEventListener('click', () => {
                events.emit('productModal:open', { id: product.id });
            });

            return renderedProduct;
        } catch (error) {
            console.error('Error rendering product:', error);
            return null;
        }
    }).filter(item => item !== null);

    views.page.render({ catalog: productsList });
});

// Обработка открытия модального окна с карточкой товара
events.on('productModal:open', (dataId: TId) => {
    console.log('Received dataId:', dataId); // Логирование объекта dataId
    const cardToPreview = productData.getCard(dataId.id);

    if (cardToPreview) {
        const content = views.cardPreview.render({
            ...cardToPreview,
            invalidPrice: !cardToPreview.price,
            buttonValidation: basketData.isInBasket(cardToPreview.id)
        });

        views.cardModal.content = content;
        views.cardModal.open();
    }
});

// Инициализация приложения
loadProducts();

// Обработка добавления и удаления товара из корзины
events.on('viewCard:addToBasket', (dataId: TId) => {
    const cardToAdd = productData.getCard(dataId.id);
    if (cardToAdd) {
        basketData.addToBasket(cardToAdd);
    }
});

events.on('viewCard:deleteFromBasket', (dataId: TId) => {
    basketData.removeFromBasket(dataId.id);
});

// Обновление данных корзины и отображение изменений
events.on('basketData:changed', (dataId: TId) => {
    const cardPreview = productData.getCard(dataId.id);
    if (cardPreview) {
        views.cardPreview.render({ invalidPrice: !cardPreview.price, buttonValidation: basketData.isInBasket(dataId.id) });
    }
    views.page.render({ counter: basketData.getGoodsNumber() });

    const goodsList = basketData.goods.map((good, index) => {
        const productInBasket = new ProductInBasket(cloneTemplate(elements.templates.cardBasket), events);
        return productInBasket.render({ ...good, index });
    });

    views.basket.render({ cards: goodsList, total: basketData.getTotal() });
});

// Обработка открытия корзины и формы заказа
events.on('viewBasket:open', () => {
    views.modal.render({
        content: views.basket.render({ total: basketData.getTotal(), emptyCheck: basketData.emptyValidation() })
    });
    views.modal.open();
});

events.on('viewOrder:open', () => {
    orderData.total = basketData.getTotal();
    orderData.items = basketData.getIdsOfGoods();
    views.modal.render({
        content: views.formOrder.render({ valid: views.formOrder.valid, errorMessage: '' })
    });
});

// Обработка ввода данных в форму заказа и валидация
events.on('payment:input', () => {
    if (views.formOrder.payment) {
        orderData.payment = views.formOrder.payment;
        orderData.address = views.formOrder.address;
    }
});

events.on('address:input', () => {
    orderData.address = views.formOrder.address;
});

events.on('order:valid', () => {
    views.formOrder.valid = views.formOrder.valid;
});

// Обработка отправки заказа и формы контактов
events.on('order:submit', () => {
    views.formOrder.clear();
    views.modal.render({
        content: views.formContacts.render({
            valid: views.formContacts.valid,
            errorMessage: 'Заполните поля электронной почты и телефона'
        })
    });
});

events.on('email:input', () => {
    orderData.email = views.formContacts.email;
});

events.on('telephone:input', () => {
    orderData.phone = views.formContacts.phone;
});

events.on('contacts:valid', () => {
    views.formContacts.valid = views.formContacts.valid;
});

// Отправка заказа на сервер и обработка успешного завершения
events.on('contacts:submit', async () => {
    const order = orderData.orderFullInfo;
    try {
        const data: TOrderSuccess = await api.postOrder(order);
        orderSuccess.orderSuccess = data;
        views.formOrder.clear();
        views.formContacts.clear();
        basketData.clearBasket();
        views.modal.render({
            content: views.success.render({ message: String(order.total) })
        });
    } catch (error) {
        console.error(error);
    }
});

// Закрытие окна после нажатия кнопки "За новыми покупками"
events.on('success:submit', () => {
    views.modal.close();
});
