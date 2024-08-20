import { IProduct } from "../../types/index";
import { IEvents } from "../base/events";
import { View } from './View';
import { ensureElement } from "../../utils/utils";
import { categories} from "../../utils/constants";

export abstract class Product<T> extends View<T> implements IProduct {
    protected _id: string;
    protected _title: HTMLHeadingElement;
    protected _price: HTMLSpanElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
        this._price = ensureElement<HTMLSpanElement>('.card__price', container);
    }
    image: string;
    description: string;

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

    // Абстрактные методы, которые должны быть реализованы в наследниках, если они нужны
    abstract getDetails(): string;
}
