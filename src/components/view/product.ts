import { IProduct } from "../../types/index";
import { IEvents } from "../base/events";
import { View } from './View';
import { ensureElement } from "../../utils/utils";
import { categories} from "../../utils/constants";


// Базовый абстрактный класс
export abstract class Product<T> extends View<T> implements IProduct {
    protected _id: string;
    protected _title: HTMLHeadingElement;
    protected _price: HTMLSpanElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
        this._price = ensureElement<HTMLSpanElement>('.card__price', container);
    }

    // Запись id карточки товара
    set id(value: string) {
        this._id = value;
    }

    // Получение id карточки товара
    get id() {
        return this._id;
    }

    // Запись имени карточки товара
    set title(value: string) {
        this.setText(this._title, value);
    }

    // Получение имени карточки товара
    get title() {
        return this._title.textContent ?? '';
    }

    // Запись цены товара
    set price(value: string) {
        this.setText(this._price, value ? `${value} синапсов` : `Бесценно`);
    }

    // Получение цены товара
    get price() {
        return this._price.textContent ?? '';
    }

    // Абстрактные свойства
    abstract get image(): string;
    abstract set image(src: string);
    abstract get description(): string;
    abstract set description(value: string);
    abstract addClassToCategory(value: string): void;
}

// Пример конкретной реализации
export class ImageProduct extends Product<HTMLElement> {
    private _image: HTMLImageElement | null;
    private _description: HTMLParagraphElement | null;
    private _category: HTMLSpanElement | null;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._image = container.querySelector('.card__image');
        this._description = container.querySelector('.card__text');
        this._category = container.querySelector('.card__category');
    }

    get image(): string {
        return this._image ? this._image.src : '';
    }

    set image(src: string) {
        if (this._image) {
            this.setImage(this._image, src, this.title);
        }
    }

    get description(): string {
        return this._description ? this._description.textContent ?? '' : '';
    }

    set description(value: string) {
        if (this._description) {
            this.setText(this._description, value);
        }
    }

    addClassToCategory(value: string) {
        if (this._category && value in categories) {
            let classes = Array.from(this._category.classList);
            classes.forEach((item: string) => {
                if (item.includes('card__category_') && this._category) {
                    this._category.classList.remove(item);
                }
            });
            this._category.classList.add(`card__category_${categories[value]}`);
        }
    }
}
