// Интерфейс продукта
export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IProductItemData {
    _products: IProductItem[]
}

// Интерфейс корзины
export interface IBasketData {
    addProduct(product: IProductItem): void; // добавить продукт в корзину
    removeProduct(product: IProductItem): void; // удалить продукт из корзины
    getNumberOfProducts(): number; // получить общее количество продуктов
    checkProduct(id: string): boolean; // проверка, есть ли уже товар в корзине (чтобы не добавлять его ещё раз)
    getProducts(): IProductItem[]; //получает массив продуктов 
    getProductIds(): string[]; // получить массив id продуктов
    getTotalAmount(): number; // получить общую сумму всех продуктов в корзине
}

// Интерфейс управления продуктами
export interface IProductManager {
    setProducts(products: IProductItem[]): void;  // установка массива продуктов
    getAllProducts(): IProductItem[]; // получение всего массива продуктов
}

// Интерфейс для модели данных Api
export interface IAppApi {
    getProducts(): Promise<IProductItem[]>;
    postOrder(order: IOrder): Promise<TSuccessData>;
}

// Интерфейс массива продуктов
export interface IProductList {
    total: number;
    items: string[];
}

// Интерфейс заказа
export interface IOrder {
    payment: PaymentMethod;
    email: string;
    address: string;
    phone: string;
    total: number;
    items: string[];
}

//Интерфейс модальных окон
export interface IModal {
    content: HTMLElement;
    buttonClose: HTMLButtonElement;
    open(): void;
    close(): void;
}

//Интерфейс представления карточки
export interface ICard {
    id: string;
    title: string;
    price: string;
    image: string;
    description: string;
}

// Интерфейс представления корзины
export interface IBasket {
    basketInfo: TBasketInfo;
    emptyCheck: boolean;
}

//Интерфейс представления формы
export interface IForm {
    valid: boolean;
    errorMessage: string;
    clear(): void;
}


//Интерфейс представления формы заказа
export interface IFormOrder {
    orderPayment: TPlacingOrderInfo;
    resetButtons(): void;
    valid: boolean;
}

//Интерфейс представления контактов пользователя
export interface IFormUserContacts {
userInfo: TUserInfo;
}

//Интерфейс представления успешной покупки
export interface ISuccess {
    message: TSuccessData;
}

//Интерфейс представления каталога
export interface IPage {
    counter: number;
    catalog: HTMLElement[];
}

export type PaymentMethod = 'cash' | 'card'; //Метод оплаты
export type TSuccessData = { id: string; total: number };
export type TUserInfo = Pick<IOrder, 'phone' | 'email'>; // Модалка данных пользователя с формой
export type TPlacingOrderInfo = Pick<IOrder, 'address' | 'payment'>; // Модалка оплаты заказа с формой
export type TBasketInfo = Pick<IOrder, 'total' | 'items'>; // Модальное окно карзины
export type TModal = { content: HTMLElement };
export type TCategoryClassNames = 'soft' | 'other' | 'additional' | 'button' | 'hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;