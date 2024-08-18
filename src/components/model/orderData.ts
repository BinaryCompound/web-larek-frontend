import { IEvents } from '../base/events';
import { IOrder, PaymentMethod } from '../../types';
import { ShoppingCart } from './basketData';

export class Order implements IOrder {
    private _payment: PaymentMethod;
    private _email: string;
    private _address: string;
    private _phone: string;
    events: IEvents;
    private cart: ShoppingCart;

    constructor(events: IEvents, cart: ShoppingCart) {
        this.events = events;
        this.cart = cart;
    }

    //Записывает метод оплаты
    set payment(type: PaymentMethod) { 
        this._payment = type;
    }

    //Возвращает метод оплаты
    get payment(): PaymentMethod {
        return this._payment;
    }

    //Записывает электронную почту пользователя
    set email(value: string) {
        this._email = value;
    }

    //Возвращает электронную почту пользователя
    get email(): string {
        return this._email;
    }

    //Записывает адрес пользователя
    set address(value: string) {
        this._address = value;
    }

    //Возвращает адрес пользователя
    get address(): string {
        return this._address;
    }

    //Записывает номер телефона пользователя
    set phone(value: string) {
        this._phone = value;
    }

    //Возвращает номер телефона пользователя
    get phone(): string {
        return this._phone;
    }

    // Возвращает общую сумму заказа из корзины
    get total(): number {
        return this.cart.getTotal();
    }

    // Возвращает массив идентификаторов товаров из корзины
    get items(): string[] {
        return this.cart.getIdsOfGoods();
    }

    //Возвращает всю информацию о заказе
    get orderFullInfo() {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address,
            total: this.total,
            items: this.items
        };
    }
}