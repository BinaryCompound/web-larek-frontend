import { IEvents } from '../base/events';
import { IOrder, PaymentMethod } from '../../types';

export class Order implements IOrder {
    private _payment: PaymentMethod;
    private _email: string;
    private _address: string;
    private _phone: string;
    private _total: number;
    private _items: string[];

    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }
    //Записывает метод оплаты
    set payment(type: PaymentMethod) { 
        this._payment = type;
    }
    //возвращает метод оплаты
    get payment() {
        return this._payment
    }
    //Записывает эолектронную почту пользователя
    set email(value: string) {
        this._email = value;
    }
    //Возвращает эл.почту пользователя
    set address(value: string) {
        this._address = value;
    }
    //Записывает номер телефона пользователя
    set phone(value: string) {
        this._phone = value;
    }
    //Записывает колл-во товаров 
    set total(value: number) {
        this._total = value;;
    }
    //Записывает массив товаров 
    set items(value: string[]) {
        this._items = value;
    }
    //Возвращает весь заказ
    get orderFullInfo() {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address,
            total: this._total,
            items: this._items
        }
    }
}