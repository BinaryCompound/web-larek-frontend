export type PaymentMethod = 'cash' | 'card';
export type TSuccessData = {id: string; total: number};
//Интерфейс продукта
export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    categoty: string;
    price: number | null;
}

// Интерфейс Управления продуктами
export interface IProductManager {
    setProducts(products: IProductItem[]): void;  // Установка массива продуктов
    getAllProducts(): IProductItem[];  // Получение всего массива продуктов
}

export interface IAppApi {
    getProducts(): Promise<IProductItem[]>;
    postOrder(order: IOrder): Promise<TSuccessData>;
  }

//То, что приходит с сервера в постмане(коллекция всех продуктов)
export interface IProductList {
    total: number;
    items: string[];
}
//То, какие данные содержит заказ
export interface IOrder {
    payMethod: PaymentMethod;
    email: string;
    address: string;
    telephone: string;
    total: number;
    items: string[];
}