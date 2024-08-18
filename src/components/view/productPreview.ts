import { IProductItem, IProductPreview } from "../../types/index";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { View } from "./View";

export class ProductPreview extends View<IProductItem> implements IProductPreview {
    protected buttonBuy: HTMLButtonElement;
    title: string;
    category: string;
    protected container: HTMLElement;
    price: number;
    image: string;
    description: string;
    id: string;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.container = container;
        this.buttonBuy = ensureElement<HTMLButtonElement>('.button', container);

        // Обработчик события клика на кнопку
        this.buttonBuy.addEventListener('click', () => {
            if (this.buttonBuy.textContent === 'Убрать из корзины') {
                this.events.emit('viewCard:deleteFromBasket', { id: this.id });
            } else {
                this.events.emit('viewCard:addToBasket', { id: this.id });
            }
        });
    }

    // Устанавливает состояние кнопки в зависимости от валидности цены товара
    set invalidPrice(value: boolean) {
        this.setDisabled(this.buttonBuy, value);
    }

    // Получает состояние кнопки, является ли она недоступной
    get invalidPrice() {
        return this.buttonBuy.disabled;
    }

    // Устанавливает текст кнопки в зависимости от состояния и валидности цены
    set buttonValidation(value: boolean) {
        if (this.invalidPrice) {
            this.setText(this.buttonBuy, 'Не продается');
        } else if (value) {
            this.setText(this.buttonBuy, 'Убрать из корзины');
        } else {
            this.setText(this.buttonBuy, 'Купить');
        }
    }

    // Рендерит данные товара и возвращает обновлённый контейнер
    render(data?: Partial<IProductItem & { invalidPrice: boolean; buttonValidation: boolean }>): HTMLElement {
        // Обновляем базовые данные через метод родительского класса
        super.render(data);

        if (data) {
            // Обновляем заголовок
            const titleElement = this.container.querySelector('.card__title') as HTMLElement;
            const titleText = data.title ?? this.title;
            this.setText(titleElement, titleText);

            // Обновляем категорию
            const categoryElement = this.container.querySelector('.card__category') as HTMLElement;
            const categoryText = data.category ?? this.category;
            this.setText(categoryElement, categoryText);

            // Обновляем изображение
            const imageElement = this.container.querySelector('.card__image') as HTMLImageElement;
            const imageSrc = data.image ?? this.image;
            this.setImage(imageElement, imageSrc, data.title);

            // Проверяем значение цены и отображаем "Бесценно", если цена равна null, undefined или 0, иначе отображаем число
            const priceElement = this.container.querySelector('.card__price') as HTMLElement;
            const price = data.price !== undefined ? data.price : this.price; // Если price отсутствует, используем значение по умолчанию

            const displayPrice = (price && price > 0) ? `${price} синапсов` : 'Бесценно';
            this.setText(priceElement, displayPrice);
        } else {
            console.log('Данные для рендеринга не предоставлены');
        }

        return this.container;
    }
}