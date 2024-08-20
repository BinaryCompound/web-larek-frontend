import { IProductBasket } from '../../types'; 
import { ensureElement } from '../../utils/utils'; 
import { IEvents } from '../base/events'; 
import { Product } from './product'; 
import { TProductBasket } from '../../types/index'; 
import { categories } from "../../utils/constants";

export class ProductInBasket<TProductBasket> extends Product<TProductBasket> implements IProductBasket {
  getDetails(): string {
    throw new Error('Метод не реализован');
  } 

  protected _index: HTMLSpanElement; 
  protected buttonDelete: HTMLButtonElement; 
  private _image: HTMLImageElement | null = null;
  private _description: HTMLParagraphElement | null = null;
  private _category: HTMLSpanElement | null = null;

  constructor(container: HTMLElement, events: IEvents) { 
    super(container, events); 

    this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container); 
    this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', container); 

    this.buttonDelete.addEventListener('click', () =>  
      this.events.emit('viewCard:deleteFromBasket', { id: this.id }) 
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
  get basketImage(): string { 
    // В корзине может не быть изображения, возвращаем пустую строку
    return this._image ? this._image.src : ''; 
  } 

  set basketImage(src: string) { 
    // В корзине нет изображения, можно оставить реализацию пустой
    console.warn('Image property is not used in ProductInBasket'); 
  } 

  get basketDescription(): string { 
    // В корзине может не быть описания, возвращаем пустую строку
    return this._description ? this._description.textContent ?? '' : ''; 
  } 

  set basketDescription(value: string) { 
    // В корзине нет описания, можно оставить реализацию пустой
    console.warn('Description property is not used in ProductInBasket'); 
  } 

  addClassToCategory(value: string) { 
    // В корзине категория не используется
    console.warn('addClassToCategory is not used in ProductInBasket'); 
  } 
}