import { IProductItem, IProductItemData } from "../../types";
import { IEvents } from '../base/events';

export class ProductItem implements IProductItemData {
  // Приватный массив для хранения карточек продуктов
  private _products: IProductItem[] = [];
  events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  // Сеттер для продуктов
  set products(products: IProductItem[]) {
    this._products = products;
    this.events.emit('cards:changed', this._products);
  }

  // Геттер для получения продуктов
  get products(): IProductItem[] {
    return this._products;
  }

  // Получение карточки продукта по ID
  getCard(id: string): IProductItem | undefined {
    return this._products.find((card) => card.id === id);
  }

  // Получение продукта по ID
  getProductById(id: string): IProductItem | undefined {
    return this._products.find((product) => product.id === id);
  }
}