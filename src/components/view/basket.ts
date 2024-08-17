import { TBasket, IBasket } from "../../types/index";
import { IEvents } from "../base/events";
import { View } from './View'
import { ensureElement } from "../../utils/utils";


export class Basket extends View<TBasket> implements IBasket {
  // DOM элемент для списка товаров, добавленных в корзину 
  protected _cardList: HTMLUListElement;

  // DOM элемент для отображения общей стоимости товаров в корзине
  protected totalCost: HTMLSpanElement;

  // DOM элемент кнопки "Оформить заказ"
  protected basketToOrder: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events)

    // Инициализация списка товаров, добавленных в корзину
    this._cardList = ensureElement<HTMLUListElement>('.basket__list', container);

    // Инициализация элемента для отображения общей стоимости товаров
    this.totalCost = ensureElement<HTMLSpanElement>('.basket__price', container);

    // Инициализация кнопки "Оформить заказ"
    this.basketToOrder = ensureElement<HTMLButtonElement>('.basket__button', container);

    // Добавление обработчика события для кнопки "Оформить заказ"
    this.basketToOrder.addEventListener('click', () => this.events.emit('order:open'))
  }

  // Обновляет список товаров, добавленных в корзину
  set cards(items: HTMLElement[]) {
    this._cardList.replaceChildren(...items)
  }

  // Обновляет отображаемую общую стоимость товаров
  set total(value: number) {
    this.setText(this.totalCost, `${value} синапсов`);
  }

  // Отключает кнопку "Оформить заказ", если корзина пуста
  set emptyCheck(state: boolean) {
    this.setDisabled(this.basketToOrder, state);
  }
}