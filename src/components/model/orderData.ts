import { IEvents } from '../base/events';
import { IOrderData, PaymentMethod } from '../../types';

export class Order implements IOrderData {
    private _payment: PaymentMethod;
    private _email: string;
    private _address: string;
    private _phone: string;
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
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
}