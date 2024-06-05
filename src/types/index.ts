import { ApiPostMethods } from "../components/base/api"

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

// Интерфейс презентера для корзины
interface IBasketPresenter {
    addProductToBasket(productId: string): void;
    removeProductFromBasket(productId: string): void;
}

// Презентер для корзины
class BasketPresenter implements IBasketPresenter {
    private basket: IBasket;
    private view: IBasketView;

    constructor(basket: IBasket, view: IBasketView) {
        this.basket = basket;
        this.view = view;
    }

    addProductToBasket(productId: string): void {
        this.basket.add(productId);
        this.view.updateBasket(this.basket.items);
    }

    removeProductFromBasket(productId: string): void {
        this.basket.remove(productId);
        this.view.updateBasket(this.basket.items);
    }
}

// Интерфейс представления для корзины
interface IBasketView {
    updateBasket(items: Map<string, number>): void;
}

// Пример представления для корзины
class BasketView implements IBasketView {
    updateBasket(items: Map<string, number>): void {
        // Обновление отображения корзины
        console.log("Basket updated: ", items);
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
