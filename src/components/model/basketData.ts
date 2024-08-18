import { IBasketData, IProductItem } from "../../types";
import { IEvents } from '../base/events';

export class ShoppingCart implements IBasketData {
  protected _goods: IProductItem[] = [];
  total: number = 0;
  events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  get goods() {
    return this._goods;
  }

  set goods(cards: IProductItem[]) {
    this._goods = cards;
    this.checkEmpty();  // Проверяем корзину на пустоту при изменении товаров
  }

  isInBasket(id: string): boolean {  // Проверяет наличие продукта в корзине по id
    return Boolean(this._goods.find(good => good.id === id));
  }

  checkBasket(id: string): void {
    if (this.isInBasket(id)) {
      this.events.emit('addToBasket:disabled');
    }
  }

  addToBasket(card: IProductItem): void {  // Добавляет товар в корзину
    this._goods.push(card);
    this.total += card.price;
    this.checkEmpty();  // Проверяем корзину на пустоту после добавления
    this.events.emit('basketData:changed', { id: card.id });
  }

  removeFromBasket(id: string): void {  // Удаляет товар из корзины по id
    const removedGood = this._goods.find(good => good.id === id);
    if (removedGood) {
      this.total -= removedGood.price;
    }
    this._goods = this._goods.filter(good => good.id !== id);
    this.checkEmpty();  // Проверяем корзину на пустоту после удаления
    this.events.emit('basketData:changed', { id });
  }

  clearBasket(): void {
    this._goods = [];
    this.total = 0;
    this.checkEmpty();  // Проверяем корзину на пустоту после очистки
    this.events.emit('basketData:changed', this._goods);
  }

  getGoodsNumber(): number {  // Получает общее количество добавленных товаров в корзину
    return this._goods.length;
  }

  getTotal(): number {  // Получает общую сумму и стоимость всех товаров в корзине
    return this.total;
  }

  getIdsOfGoods(): string[] {
    return this._goods.map(good => good.id);
  }

  private checkEmpty(): void {
    if (this._goods.length === 0) {
      this.events.emit('basket:empty');
    } else {
      this.events.emit('basket:has-items');
    }
  }
}
