import { IProductItem, IProductPreview, TProductPreview } from "../../types/index"
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { View } from "./View";

export class ProductPreview extends View<IProductItem> implements IProductPreview, IProductItem {
    protected buttonBuy: HTMLButtonElement;
    title: string;
    category: string;
    protected container: HTMLElement;
    price: number;
    image: string;
    description: string;
    id: string;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events)
        this.buttonBuy = ensureElement<HTMLButtonElement>('.button', container);
        this.buttonBuy.addEventListener('click', () => {
            if (this.buttonBuy.textContent === 'Убрать из корзины') {
                this.events.emit('viewCard:deleteFromBasket', { id: this.id })
            }
            else { this.events.emit('viewCard:addToBasket', { id: this.id }) }
        })

    }

    set invalidPrice(value: boolean) {
        this.setDisabled(this.buttonBuy, value)
    }

    get invalidPrice() {
        return this.buttonBuy.disabled;
    }

    set buttonValidation(value: boolean) {
        if (this.invalidPrice) {
            this.setText(this.buttonBuy, 'Не продается');
        }
        else if (value) {
            this.setText(this.buttonBuy, 'Убрать из корзины');
        }
        else {
            this.setText(this.buttonBuy, 'Купить')
        }
    }

    render(data?: Partial<IProductItem & {invalidPrice: boolean; buttonValidation: boolean}>): HTMLElement {
        super.render(data);

        this.setText(this.container.querySelector('.card__title'), this.title);
        this.setText(this.container.querySelector('.card__price'), this.price + ' руб.');
        this.setText(this.container.querySelector('.card__category'), this.category);
        this.setImage(this.container.querySelector('.card__image'), this.image, data.title);

        return this.container;
    }
}
