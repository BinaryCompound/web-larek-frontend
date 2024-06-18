// Слой отображения

import { IProduct, Product, IBasket, Basket, basket, IOrder, Order, IUser, User } from './modal.ts';

/**
 * Обновляет счетчик товаров в корзине.
 * @param count - Количество товаров в корзине.
 */
export function updateBasketCounter(count: number) {
  const counterElement = document.querySelector('.header__basket-counter');
  if (counterElement) {
    counterElement.textContent = count.toString();
  }
}

/**
 * Отображает список продуктов в галерее.
 * @param products - Массив продуктов для отображения.
 */
export function displayProducts(products: IProduct[]) {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  gallery.innerHTML = ''; // Очистка галереи

  products.forEach(product => {
    const template = document.getElementById('card-catalog') as HTMLTemplateElement;
    if (!template) return;

    const card = template.content.cloneNode(true) as HTMLElement;
    card.querySelector('.card__title')!.textContent = product.title;
    card.querySelector('.card__category')!.textContent = product.category;
    card.querySelector('.card__price')!.textContent = `${product.price} синапсов`;
    (card.querySelector('.card__image') as HTMLImageElement).src = product.image;
    card.querySelector('.gallery__item')!.addEventListener('click', () => showProductDetails(product));

    gallery.appendChild(card);
  });
}

/**
 * Показывает детали продукта в модальном окне.
 * @param product - Продукт, детали которого нужно показать.
 */
export function showProductDetails(product: IProduct) {
  const modal = document.getElementById('modal-container');
  if (!modal) return;

  const template = document.getElementById('card-preview') as HTMLTemplateElement;
  if (!template) return;

  const content = template.content.cloneNode(true) as HTMLElement;
  content.querySelector('.card__title')!.textContent = product.title;
  content.querySelector('.card__category')!.textContent = product.category;
  content.querySelector('.card__text')!.textContent = product.description;
  content.querySelector('.card__price')!.textContent = `${product.price} синапсов`;
  (content.querySelector('.card__image') as HTMLImageElement).src = product.image;
  content.querySelector('.card__button')!.addEventListener('click', () => addToBasket(product));

  modal.querySelector('.modal__content')!.innerHTML = '';
  modal.querySelector('.modal__content')!.appendChild(content);
  modal.classList.add('modal--open');
}

/**
 * Добавляет продукт в корзину.
 * @param product - Продукт для добавления в корзину.
 */
export function addToBasket(product: IProduct) {
  // Логика добавления продукта в корзину
  basket.add(product);
  console.log('Продукт добавлен в корзину:', product);
  updateBasketCounter(basket.items.length);
}

/**
 * Обновляет список продуктов в корзине.
 * @param basket - Объект корзины.
 */
export function updateBasketView(basket: IBasket) {
  const basketList = document.querySelector('.basket__list');
  if (!basketList) return;

  basketList.innerHTML = ''; // Очистка списка корзины

  basket.items.forEach((product, index) => {
    const template = document.getElementById('card-basket') as HTMLTemplateElement;
    if (!template) return;

    const item = template.content.cloneNode(true) as HTMLElement;
    item.querySelector('.basket__item-index')!.textContent = (index + 1).toString();
    item.querySelector('.card__title')!.textContent = product.title;
    item.querySelector('.card__price')!.textContent = `${product.price} синапсов`;
    item.querySelector('.basket__item-delete')!.addEventListener('click', () => removeFromBasket(product.id));

    basketList.appendChild(item);
  });

  const basketPrice = document.querySelector('.basket__price');
  if (basketPrice) {
    const total = basket.items.reduce((sum, item) => sum + (item.price || 0), 0);
    basketPrice.textContent = `${total} синапсов`;
  }
}

/**
 * Удаляет продукт из корзины.
 * @param productId - Идентификатор продукта для удаления.
 */
export function removeFromBasket(productId: string) {
  // Логика удаления продукта из корзины
  basket.remove(productId);
  console.log('Продукт удален из корзины:', productId);
  updateBasketView(basket);
  updateBasketCounter(basket.items.length);
}

/**
 * Инициализирует форму заказа.
 * @param order - Объект заказа.
 */
export function initOrderForm(order: IOrder) {
  const orderForm = document.forms.namedItem('order') as HTMLFormElement;
  if (!orderForm) return;

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Логика обработки заказа
    console.log('Заказ оформлен:', order);
    showOrderSuccess();
  });
}

/**
 * Инициализирует форму контактной информации.
 * @param user - Объект пользователя.
 */
export function initContactForm(user: IUser) {
  const contactForm = document.forms.namedItem('contacts') as HTMLFormElement;
  if (!contactForm) return;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Логика обработки контактной информации
    console.log('Контактная информация сохранена:', user);
  });
}

/**
 * Показывает сообщение об успешном оформлении заказа.
 */
export function showOrderSuccess() {
  const modal = document.getElementById('modal-container');
  if (!modal) return;

  const template = document.getElementById('success') as HTMLTemplateElement;
  if (!template) return;

  const content = template.content.cloneNode(true) as HTMLElement;
  modal.querySelector('.modal__content')!.innerHTML = '';
  modal.querySelector('.modal__content')!.appendChild(content);
  modal.classList.add('modal--open');
}
