import {ApiPostMethods} from "../components/base/api"

// Интерфейс товаров
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

// Модель товаров
class Product implements IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;

    constructor(id: string, description: string, image: string, title: string, category: string, price: number | null) {
        this.id = id;
        this.description = description;
        this.image = image;
        this.title = title;
        this.category = category;
        this.price = price;
    }
}

// Интерфейс корзины
interface IBasket {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

// Модель корзины
class Basket implements IBasket {
    items: Map<string, number>;

    constructor() {
        this.items = new Map<string, number>();
    }

    add(id: string): void {
        if (this.items.has(id)) {
            this.items.set(id, this.items.get(id)! + 1);
        } else {
            this.items.set(id, 1);
        }
    }

    remove(id: string): void {
        if (this.items.has(id)) {
            const count = this.items.get(id)!;
            if (count > 1) {
                this.items.set(id, count - 1);
            } else {
                this.items.delete(id);
            }
        }
    }
}

//Интерфейс способа оплаты
interface ITopay {
    paymentMethod: boolean
    address: string
}

// Модель способа оплаты
class ToPay implements ITopay {
    paymentMethod: boolean;
    address: string;

    constructor(paymentMethod: boolean, address: string) {
        this.paymentMethod = paymentMethod;
        this.address = address;
    }
}

//Интерфейс данных о пользователе
interface IUser {
    email: string
    telephone: string
}

// Модель данных о пользователе
class User implements IUser {
    email: string;
    telephone: string;

    constructor(email: string, telephone: string) {
        this.email = email;
        this.telephone = telephone;
    }
}


//Интерфейс api клиента
interface IApiClient {
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
    put<T>(uri: string, data: object): Promise<T>;
    delete<T>(uri: string): Promise<T>;
}
