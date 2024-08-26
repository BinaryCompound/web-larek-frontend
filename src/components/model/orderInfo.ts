import { ShoppingCart } from "../model/basketData";
import { IOrder, PaymentMethod } from "../../types";

export class Order {
    cart: ShoppingCart;
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;

    constructor(
        cart: ShoppingCart, 
        payment: PaymentMethod = 'cash',
        email: string = '', 
        phone: string = '', 
        address: string = ''
    ) {
        this.cart = cart;
        this.payment = payment;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    getOrderFullInfo(): IOrder {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
            total: this.cart.getTotal(),
            items: this.cart.getIdsOfGoods()
        };
    }
}
