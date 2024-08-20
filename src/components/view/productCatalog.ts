import { IProductCatalog } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Product } from "./product";
import { categories } from "../../utils/constants";

export class ProductItemCatalogue<TProductCatalog> extends Product<TProductCatalog> implements IProductCatalog {
  getDetails(): string {
    throw new Error('Метод не реализован');
  }
  private _image: HTMLImageElement;
  private _category: HTMLSpanElement;
  private _description: HTMLParagraphElement | null;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
    this._description = container.querySelector('.card__text'); // Assuming description is used

    this.container.addEventListener('click', () => this.events.emit('modal-card:open', { id: this.id }));
  }

  protected addCSSClassCategory(value: string) {
    if (value in categories) {
      this._category.classList.add(categories[value]);
    }
  }

  // Реализация геттера и сеттера для image
  get catalogImage(): string {
    return this._image.src;
  }

  set catalogImage(src: string) {
    this._image.src = src;
    this._image.alt = this.title; // Обновляем alt для изображения
  }

  // Реализация геттера и сеттера для category
  get category(): string {
    return this._category.textContent ?? '';
  }

  set category(value: string) {
    this._category.textContent = value;
    this.addCSSClassCategory(value);
  }

  // Реализация геттера и сеттера для description
  get catalogDescription(): string {
    return this._description ? this._description.textContent ?? '' : '';
  }

  set catalogDescription(value: string) {
    if (this._description) {
      this._description.textContent = value;
    }
  }

  // Реализация метода addClassToCategory
  addClassToCategory(value: string) {
    if (this._category && value in categories) {
      let classes = Array.from(this._category.classList);
      classes.forEach((item: string) => {
        if (item.includes('card__category_')) {
          this._category.classList.remove(item);
        }
      });
      this._category.classList.add(`card__category_${categories[value]}`);
    }
  }
}
