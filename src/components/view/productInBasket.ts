import { IProductBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Product } from './product';
import { TProductBasket } from '../../types/index';

export class ProductInBasket<TProductBasket> extends Product<TProductBasket> implements IProductBasket {

  protected _index: HTMLSpanElement;
  protected buttonDelete: HTMLButtonElement;

  constructor (container: HTMLElement, events:IEvents) {
    super(container, events);
    
    this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
    this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    this.buttonDelete.addEventListener('click', () => this.events.emit('viewCard:deleteFromBasket', {id: this.id}))
  }

  // устанавливает порядковый номер  товара в корзине
  set index (value: number) {
    this.setText(this._index, value+1)
  }

  // возвращает порядковый номер товара в корзине
  get index () {
    return Number(this._index.textContent)
  }
}