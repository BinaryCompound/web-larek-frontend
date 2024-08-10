import './scss/styles.scss';
import { IAppApi, IProduct, IProductCatalog, IProductItem } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/appApi';
import { EventEmitter } from './components/base/events';
import { ProductItem } from './components/model/productData';
import { ShoppingCart } from './components/model/basketData';
import { Order } from './components/model/orderData';
import { TId } from './types/index';
import { FormOrder } from './components/view/orderForm';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductItemCatalogue } from './components/view/productCatalog';
import { ProductPreview } from './components/view/ProductPreview';
import { Page } from './components/view/page';
import { Modal } from './components/view/vmodal';
import { ProductInBasket } from './components/view/productInBasket';
import { Basket } from './components/view/basket';
import { FormContacts } from './components/view/formContact';
import { Success } from './components/model/succesData';
import { VSuccess } from './components/view/succes';
import { TOrderSuccess } from './types/index';


// Данные: экземпляры классов для управления данными
const events = new EventEmitter;
const productData = new ProductItem(events);
const basketData = new ShoppingCart(events);
const orderData = new Order(events);
const orderSuccess = new Success(events);

// Элементы представления: контейнеры
const containerViewPage = ensureElement<HTMLElement>('.page');
const containerViewModal = ensureElement<HTMLElement>('#modal-container');

// Элементы представления: шаблоны
const templateViewCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateViewCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateViewCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateViewBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateViewOrder = ensureElement<HTMLTemplateElement>('#order');
const templateViewContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateViewSuccess = ensureElement<HTMLTemplateElement>('#success');

// Элементы представления: экземпляры классов
const viewPage = new Page(containerViewPage, events);
const viewModal = new Modal(containerViewModal, events);
const viewCardPreview = new ProductPreview(cloneTemplate(templateViewCardPreview), events);

// const viewCardBasket = new ViewCardBasket(cloneTemplate(templateViewCardBasket), events);
const viewBasket = new Basket(cloneTemplate(templateViewBasket), events);
const viewFormOrder = new FormOrder(cloneTemplate(templateViewOrder), events);
const viewFormContacts = new FormContacts(cloneTemplate(templateViewContacts), events);
// const viewSuccess = new ViewSuccess(cloneTemplate(templateViewSuccess), events);

// Получение экземпляра API
const api: IAppApi = new AppApi(CDN_URL, API_URL);

// Загрузка данных о товарах с сервера
api.getCards().then((data) => {
    productData.cards = data
}).catch(console.error)

// Отображение карточек товаров в каталоге
events.on('cards:changed', (cards: IProductItem[]) => {
    const productsList = cards.map((card) => {
        const viewProduct = new ProductItemCatalogue<IProductCatalog>(cloneTemplate(templateViewCardCatalog), events);
        return viewProduct.render(card)
    })

    viewPage.render({ catalog: productsList })
});

// Блокировка страницы при открытии модального окна
events.on('viewModal:open', () => {
    viewPage.lockScreen(true);
});

// Разблокировка страницы при закрытии модального окна
events.on('viewModal:close', () => {
    viewPage.lockScreen(false);
});

// Открытие модального окна с карточкой товара
events.on('ProductPreview:open', (dataId: TId) => {
    if (dataId.id) {
        const cardToPreview = productData.getCard(dataId.id);
        if (cardToPreview) {
            viewModal.render({
                content: viewCardPreview.render({
                    ...cardToPreview,
                    invalidPrice: Boolean(!cardToPreview.price),
                    buttonValidation: basketData.isInBasket(cardToPreview.id)
                })
            });
            viewModal.open();
        }
    }
});

// Добавление товара в корзину
events.on('viewCard:addToBasket', (dataId: TId) => {
    const cardToAdd = productData.getCard(dataId.id);
    if (cardToAdd) {
        basketData.addToBasket(cardToAdd)
    }
});

// Удаление товара из корзины
events.on('viewCard:deleteFromBasket', (dataId: TId) => {
    basketData.removeFromBasket(dataId.id)
});

// Обновление данных корзины и отображение изменений
events.on('basketData:changed', (dataId: TId) => {
    const cardPreview = productData.getCard(dataId.id)
    if (cardPreview) {
        viewCardPreview.render({ invalidPrice: Boolean(!cardPreview.price), buttonValidation: basketData.isInBasket(dataId.id) })
    }
    viewPage.render({ counter: basketData.getGoodsNumber() }) // Обновление счетчика
    const goodsList = basketData.goods.map((good, index) => { // Создание DOM-элементов для товаров в корзине
        const productInBasket = new ProductInBasket(cloneTemplate(templateViewCardBasket), events);
        return productInBasket.render({ ...good, index: index++ })
    })
    viewBasket.render({ cards: goodsList, total: basketData.getTotal() })
});

// Открытие корзины по клику на иконку на главной странице
events.on('viewBasket:open', () => {
    viewModal.render({ content: viewBasket.render({ total: basketData.getTotal(), emptyCheck: basketData.emptyValidation() }) });
    viewModal.open();
});

// Открытие формы заказа
events.on('viewOrder:open', () => {
    orderData.total = basketData.getTotal()
    orderData.items = basketData.getIdsOfGoods()
    viewModal.render({
        content: viewFormOrder.render({
            valid: viewFormOrder.valid,
            errorMessage: ''
        })
    })
})

events.on('payment:input', () => {
    if (viewFormOrder.payment) {
        orderData.payment = viewFormOrder.payment
        orderData.address = viewFormOrder.address
    }
})

events.on('address:input', () => {
    orderData.address = viewFormOrder.address
})

// Валидация данных заказа
events.on('order:valid', () => {
    viewFormOrder.valid = viewFormOrder.valid
})

// Открытие формы с контактной информацией после подтверждения заказа
events.on(`order:submit`, () => {
    viewFormOrder.clear()
    return viewModal.render({
        content: viewFormContacts.render({
            valid: viewFormContacts.valid,
            errorMessage: 'Заполните поля электронной почты и телефона'
        })
    });
});

events.on('email:input', () => {
    orderData.email = viewFormContacts.email
})

events.on('telephone:input', () => {
    orderData.phone = viewFormContacts.phone
})

// Валидация контактных данных
events.on('contacts:valid', () => {
    viewFormContacts.valid = viewFormContacts.valid;
});

// Отправка заказа на сервер
events.on('contacts:submit', () => {
    const order = orderData.orderFullInfo

    api.postOrder(order).then((data: TOrderSuccess) => {
        orderSuccess.orderSuccess = data;
        viewFormOrder.clear();
        viewFormContacts.clear();
        basketData.clearBasket();
    }).catch(console.error)
    const viewSuccess = new VSuccess(cloneTemplate(templateViewSuccess), events);
    viewModal.render({ content: viewSuccess.render({ message: String(order.total) }) })
});

// Закрытие окна после нажатия кнопки "За новыми покупками"
events.on('success:submit', () => {
    viewModal.close();
})