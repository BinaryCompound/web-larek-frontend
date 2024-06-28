import { Component } from './base/Component';
import { CategoryType } from '../types';
import { ensureElement, handlePrice } from '../utils/utils';
import { CDN_URL, categoryClassMapping } from '../utils/constants';

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
}

export class Card extends Component<ICard> {
  private _title: HTMLElement;
  private _image: HTMLImageElement;
  private _category: HTMLElement;
  private _price: HTMLElement;
  private _button: HTMLButtonElement;

  constructor(
    public blockName: string,
    container: HTMLElement,
    private actions?: ICardActions
  ) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._button = ensureElement<HTMLButtonElement>(`.${blockName}__button`, container);
    this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);

    this._initializeEventListeners();
  }

  private _initializeEventListeners(): void {
    if (this.actions?.onClick) {
      this._button.addEventListener('click', this.actions.onClick);
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }
  get id(): string {
    return this.container.dataset.id || '';
  }

  set title(value: string) {
    this._title.textContent = value;
  }
  get title(): string {
    return this._title.textContent || '';
  }

  set image(value: string) {
    this._image.src = `${CDN_URL}${value}`;
  }

  set selected(value: boolean) {
    this._button.disabled = value;
  }

  set price(value: number | null) {
    this._price.textContent = value ? `${handlePrice(value)} синапсов` : 'Бесценно';
    this._button.disabled = !value;
  }

  set category(value: CategoryType) {
    this._category.textContent = value;
    this._category.classList.add(categoryClassMapping[value]);
  }
}

export class StoreItem extends Card {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);
  }
}

export class StoreItemPreview extends Card {
  private _description: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);

    this._description = ensureElement<HTMLElement>(`.${this.blockName}__text`, container);
  }

  set description(value: string) {
    this._description.textContent = value;
  }
}
