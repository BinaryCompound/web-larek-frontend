//Модели данных 
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

  interface IBasket {
    items: IProduct[];
    add(product: IProduct): void;
    remove(id: string): void;
  }
  
  class Basket implements IBasket {
    items: IProduct[] = [];
  
    add(product: IProduct) {
      this.items.push(product);
    }
  
    remove(id: string) {
      this.items = this.items.filter(item => item.id !== id);
    }
  }

  interface IOrder {
    paymentMethod: string;
    address: string;
    email: string;
    telephone: string;
  }
  
  class Order implements IOrder {
    constructor(
      public paymentMethod: string,
      public address: string,
      public email: string,
      public telephone: string
    ) {}
  }

  interface IUser {
    email: string;
    telephone: string;
  }
  
  class User implements IUser {
    constructor(public email: string, public telephone: string) {}
  }