import { IProductCatalog, TProductCatalog, TCategoryClasses } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Product } from "./product";
import { categories } from "../../utils/constants"

export class ProductItemCatalogue<TProductCatalog> extends Product<TProductCatalog> implements IProductCatalog {
  protected _image: HTMLImageElement;
  protected _category: HTMLSpanElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
    this.container.addEventListener('click', () => this.events.emit('modal-card:open', { id: this.id }))
  }

  protected addCSSClassCategory(value: string) {

    if (value in categories) {
      this._category.classList.add(categories[value])
    }
  }

  set image(src: string) {
    this._image.src = src;
    this._image.alt = this.title
  }

  set category(value: string) {
    this._category.textContent = value;
    this.addCSSClassCategory(value)
  }

  get category() {
    return this._category.textContent ?? '';
  }
}