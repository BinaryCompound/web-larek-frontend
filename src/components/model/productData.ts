import { IProductItem, IProductItemData } from "../../types";
import { IEvents } from '../base/events';

export class ProductItem implements IProductItemData {


  // Массив для хранения карточек продуктов
  _products: IProductItem[];
  cards: IProductItem[];
  events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  // Сеттер для продуктов, с сохранением в массив cards
  set products(products: IProductItem[]) {
    this._products = products;
    this.cards = products; // Сохраняем продукты в cards
    this.events.emit('cards:changed', this._products);
  }

  get products() {
    return this._products;
  }

  // Получение карточки продукта по ID
  getCard(id: string) {
    return this.cards.find((card: IProductItem) => card.id === id);
  }

  // Получение продукта по ID
  getProductById(id: string) {
    return this._products.find((product) => product.id === id);
  }

}