// Модели
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

  // API-клиент
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

class ApiClient {
  async get(uri: string): Promise<any> {
    const response = await fetch(uri);
    return response.json();
  }

  async post(uri: string, data: any, method: ApiPostMethods = 'POST'): Promise<any> {
    const response = await fetch(uri, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}


// Представление
abstract class Component {
    abstract render(): void;
  }
  
  class Modal extends Component {
    open(): void {
      console.log("Modal opened");
    }
  
    close(): void {
      console.log("Modal closed");
    }
  
    render(): void {
      // Реализация модального рендеринга
    }
  }
  
  class BasketView extends Component {
    constructor(private basket: Basket) {
      super();
    }
  
    addItem(product: IProduct): void {
      this.basket.add(product);
    }
  
    removeItem(id: string): void {
      this.basket.remove(id);
    }
  
    render(): void {
      // Реализация для рендеринга элементов корзины
      console.log("Basket rendered with items: ", this.basket.items);
    }
  }
  
  class Form extends Component {
    submit(): void {
      console.log("Form submitted");
    }
  
    render(): void {
      // Реализация для рендеринга формы 
    }
  }
  
  class Success extends Component {
    render(): void {
      // Реализация для рендеринга сообщения об успехе
      console.log("Success message rendered");
    }
  }
  
  class Page extends Component {
    render(): void {
      // Реализация для рендеринга страницы
    }
  }
  
  // Использование
  const product = new Product("1", "Description", "image.jpg", "Title", "Category", 10);
  const basket = new Basket();
  const order = new Order("Credit Card", "123 Main St", "email@example.com", "123-1234");
  const user = new User("email@example.com", "123-1234");
  const apiClient = new ApiClient();
  const eventEmitter = new EventEmitter();
  const modal = new Modal();
  const basketView = new BasketView(basket);
  const form = new Form();
  const success = new Success();
  const page = new Page();
  
  product;
  basket;
  order;
  user;
  apiClient;
  eventEmitter;
  modal;
  basketView;
  form;
  success;
  page;