// Интерфейс товаров
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

class Product implements IProduct {
    constructor(
        public id: string,
        public description: string,
        public image: string,
        public title: string,
        public category: string,
        public price: number | null
    ) {}
}

// Интерфейс корзины
interface IBasket {
    items: IProduct[];
    add(id: string): void;
    remove(id: string): void;
}

class Basket implements IBasket {
    items: IProduct[] = [];

    add(id: string): void {
        // Здесь должен быть код для добавления товара в корзину
    }

    remove(id: string): void {
        // Здесь должен быть код для удаления товара из корзины
    }
}

// Интерфейс заказа
interface IOrder {
    paymentMethod: string
    address: string
    email: string
    telephone: string
}

class Order implements IOrder {
    constructor(
        public paymentMethod: string,
        public address: string,
        public email: string,
        public telephone: string
    ) {}
}

// Интерфейс Пользователя
interface IUser {
    email: string;
    telephone: string;
}

class User implements IUser {
    constructor(
        public email: string,
        public telephone: string
    ) {}
}