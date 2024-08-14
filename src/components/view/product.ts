import { IProduct } from "../../types/index";
import { IEvents } from "../base/events";
import { View } from './View';
import { ensureElement } from "../../utils/utils";
import { categories} from "../../utils/constants";


export abstract class Product<T> extends View<T> implements IProduct {
    protected _id: string;
    protected _title: HTMLHeadingElement;
    protected _price: HTMLSpanElement;
    protected _image: HTMLImageElement | null;
    protected _description: HTMLParagraphElement | null;
    protected _category: HTMLSpanElement | null;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
        this._price = ensureElement<HTMLSpanElement>('.card__price', container);
        this._image = container.querySelector('.card__image');
        this._category = container.querySelector('.card__category');
        this._description = container.querySelector('.card__text');
    }

    // запись id карточки товара
    set id(value: string) {
        this._id = value;
    }

    // получение id карточки товара 
    get id() {
        return this._id;
    }

    //запись имени карточки товара
    set title(value: string) {
        this.setText(this._title, value);
    }

    // получение имени карточки товара
    get title() {
        return this._title.textContent ?? '';
    }

    // запись цены товара
    set price(value: string) {
        this.setText(this._price, value ? `${value} синапсов` : `Бесценно`)
    }

    // получение цены товара
    get price() {
        return this._price.textContent ?? ''
    }

    // запись изображения товара
    set image(src: string) {
        if (this._image) {
            this.setImage(this._image, src, this.title);
        }
    }

    // получение ссылки на изображение товара
    get image() {
        if (this._image) {
            return this._image.src
        }
        return ''
    }

    //записывет текста в DOM-элементе описания
    set description(value: string) {
        if (this._description)
            this.setText(this._description, value);
    }

    // добавление дополнительных классов категории в зависимости от ее содержания 
    addClassToCategory(value: string) {
        if (this._category && value in categories) {
            let classes = Array.from(this._category.classList)
            classes.forEach((item: string) => {
                if (item.includes('card__category_') && this._category) {
                    this._category.classList.remove(item)
                }
            })
            this._category.classList.add(`card__category_${categories[value]}`)
        }
    }
}
