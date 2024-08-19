import { IProductBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Product } from './product';
import { TProductBasket } from '../../types/index';

export class ProductInBasket<TProductBasket> extends Product<TProductBasket> implements IProductBasket {

  protected _index: HTMLSpanElement;
  protected buttonDelete: HTMLButtonElement;

  constructor (container: HTMLElement, events: IEvents) {
    super(container, events);

    this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
    this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    this.buttonDelete.addEventListener('click', () => 
      this.events.emit('viewCard:deleteFromBasket', {id: this.id})
    );
  }

  // Устанавливает порядковый номер товара в корзине
  set index(value: number) {
    this.setText(this._index, (value + 1).toString()); // Убедитесь, что вы преобразуете число в строку
  }

  // Возвращает порядковый номер товара в корзине
  get index() {
    return Number(this._index.textContent) - 1; // Вычисляем исходный номер (если нужен именно исходный)
  }

  // Переопределение абстрактных свойств и методов из Product
  get image(): string {
    // Если в корзине изображения нет, возвращайте пустую строку или другой подходящий результат
    return '';
  }

  set image(src: string) {
    // Необходимо, чтобы не было ошибок в базовом классе, можно оставить пустым
  }

  get description(): string {
    // Если описание не используется, возвращайте пустую строку или другой подходящий результат
    return '';
  }

  set description(value: string) {
    // Необходимо, чтобы не было ошибок в базовом классе, можно оставить пустым
  }

  addClassToCategory(value: string) {
    // Если класс категории не используется, можно оставить пустым
  }
}
