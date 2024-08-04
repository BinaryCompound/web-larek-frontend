import { IProductItem, IProductItemData } from "../../types";
import { IEvents } from '../base/events';

export class ProductItem implements IProductItemData {
  _product: IProductItem[];
  events: IEvents;

  constructor (events: IEvents) {
    this.events = events;
  }

  set products(product: IProductItem[]) {
    this._product = product;
    this.events.emit('cards:changed', this._product);
  }

  get products() {
    return this._product;
  }

  getProductId (id: string) {
    return this._product.find((product) => {
      if (product.id === id) {
        return product
      }
    })     
  }

}