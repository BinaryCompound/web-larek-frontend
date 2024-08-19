// Интерфейс продукта
export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IProductItemData {
    products: IProductItem[];
}

// Интерфейс корзины
export interface IBasketData {
    goods: IProductItem[];
    isInBasket(id:string): boolean;
    addToBasket(card: IProductItem): void;
    removeFromBasket(id: string): void;
    clearBasket(): void;
    getGoodsNumber(): number;
    getTotal(): number;
    getIdsOfGoods(): string[];
  }

// Интерфейс для модели данных Api
export interface IAppApi {
    getCards(): Promise<IProductItem[]>;
    getCardById(id: string): Promise<IProductItem>;
    postOrder(order: IOrder): Promise<TOrderSuccess>;
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

// Интерфейс успешного заказа
export interface IOrderSuccess {
    orderSuccess: TOrderSuccess;
}

//Интерфейс модальных окон
export interface IModal {
    content: HTMLElement;
    buttonClose: HTMLButtonElement;
    open(): void;
    close(): void;
}

//Интерфейс представления карточки
export interface IProduct {
    id: string;
    title: string;
    price: string;
    image: string;
    description: string;
}

export interface IOrderFullInfo {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
  }

// Интерфейс представления корзины
export interface IBasket {
    cards: HTMLElement[];
    total: number;
    emptyCheck: boolean;
}

export interface IProductBasket {
    index: number;
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
    message: TOrderSuccess;
}

//Интерфейс представления каталога
export interface IPage {
    counter: number;
    catalog: HTMLElement[];
}

export interface IProductCatalog {
    category: string;
}

export interface IViewCardPreview {
    category: string;
    invalidPrice: boolean;
    buttonValidation: boolean;
}

export interface IProductPreview {
    category: string;
    invalidPrice: boolean;
    buttonValidation: boolean;
}

export type TOrderSuccess =  Pick<IOrder, 'items' | 'total'>;
export type PaymentMethod = 'cash' | 'card'; //Метод оплаты
export type TUserInfo = Pick<IOrder, 'phone' | 'email'>; // Модалка данных пользователя с формой
export type TPlacingOrderInfo = Pick<IOrder, 'address' | 'payment'>; // Модалка оплаты заказа с формой
export type TBasket = { cards: HTMLElement[], total: number, emptyCheck: boolean };
export type TBasketInfo = Pick<IOrder, 'total' | 'items'>; // Модальное окно карзины
export type TModal = { content: HTMLElement };
export type TProductPreview = IProductItem & { invalidPrice: boolean; buttonValidation: boolean };
export type TProductBasket = Pick<IProductItem, 'id' | 'title' | 'price'> & { index: number };
export type TCategoryClassNames = 'card__category_soft' |'card__category_other' | 'card__category_additional' | 'card__category_button' | 'card__category_hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;
export type TProductCatalog = Pick<IProductItem, 'id' | 'title' | 'price' | 'category' | 'image'>;
export type TForm = { valid: boolean; errorMessage: string; };
export type TFormContacts = { email: string; phone: string; valid: Boolean };
export type TPayment = Pick<IOrder, 'payment'>;
export type TFormOrder = { payment: TPayment; address: string; valid: Boolean };
export type TId = {id: string};