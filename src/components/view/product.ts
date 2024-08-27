import { IProduct } from "../../types/index"; 
import { IEvents } from "../base/events"; 
import { View } from './View'; 
import { ensureElement } from "../../utils/utils"; 
import { categories } from "../../utils/constants"; 
 
export abstract class Product<T> extends View<T> implements IProduct { 
    _id: string; 
    _title: HTMLHeadingElement; 
    _price: HTMLSpanElement; 
    image: string; 
    description: string; 
    id: string;
    title: string;
    price: string;

    constructor(container: HTMLElement, events: IEvents) { 
        super(container, events);
        this._title = ensureElement<HTMLHeadingElement>('.card__title', container); 
        this._price = ensureElement<HTMLSpanElement>('.card__price', container); 
    } 

    setId(value: string): void {
        this._id = value;
    }

    setTitle(value: string): void {
        this.setText(this._title, value);
    }

    setPrice(value: string): void {
        this.setText(this._price, value ? `${value} синапсов` : `Бесценно`);
    }

    abstract getDetails(): string; 
}