// Интерфейс товаров
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

// Интерфейс корзины
interface IBasket {
    items: string;
    add(id: string): void;
    remove(id: string): void;
}

// Интерфейс презентера для корзины
interface IBasketPresenter {
    addProductToBasket(productId: string): void;
    removeProductFromBasket(productId: string): void;
}

// Интерфейс представления для корзины
interface IBasketView {
    updateBasket(items: Map<string, number>): void;
}

//Интерфейс способа оплаты
interface ITopay {
    paymentMethod: boolean
    address: string
}

//Интерфейс данных о пользователе
interface IUser {
    email: string
    telephone: string
}

//Интерфейс api клиента
interface IApiClient {
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object): Promise<T>;
    put<T>(uri: string, data: object): Promise<T>;
    delete<T>(uri: string): Promise<T>;
}
