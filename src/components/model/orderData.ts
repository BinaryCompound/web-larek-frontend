import { IEvents } from '../base/events';
import { IOrder, PaymentMethod } from '../../types';
import { ShoppingCart } from './basketData';

export class Order implements IOrder {
    private _payment: PaymentMethod;
    private _email: string;
    private _address: string;
    private _phone: string;
    private _cart: ShoppingCart;
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
        this._cart = new ShoppingCart(events);  // Инициализируем корзину здесь, если нужно
    }

    set payment(type: PaymentMethod) {
        this._payment = type;
    }

    get payment(): PaymentMethod {
        return this._payment;
    }

    set email(value: string) {
        this._email = value;
    }

    get email(): string {
        return this._email;
    }

    set address(value: string) {
        this._address = value;
    }

    get address(): string {
        return this._address;
    }

    set phone(value: string) {
        this._phone = value;
    }

    get phone(): string {
        return this._phone;
    }

    set cart(cart: ShoppingCart) {
        this._cart = cart;
    }

    get cart(): ShoppingCart {
        return this._cart;
    }

    get total(): number {
        return this._cart.getTotal();
    }

    get items(): string[] {
        return this._cart.getIdsOfGoods();
    }

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
