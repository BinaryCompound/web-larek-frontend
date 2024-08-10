import { IProductItem, IProductItemData } from "../../types";
import { IEvents } from '../base/events';

export class ProductItem implements IProductItemData {

  getCard(id: string) {                                  //находит карточку товара по id 
    return this.cards.find((card: { id: string; }) => {
      if (card.id === id) {
        return card
      }
    })
  }

  _product: IProductItem[];
  events: IEvents;
  cards: any;

  constructor(events: IEvents) {
    this.events = events;
  }

  set products(products: IProductItem[]) {
    this._product = products;
    this.events.emit('cards:changed', this._product);
  }

  get products() {
    return this._product;
  }

  getProductById(id: string) {
    return this._product.find((product) => {
      if (product.id === id) {
        return product
      }
    })
  }

}