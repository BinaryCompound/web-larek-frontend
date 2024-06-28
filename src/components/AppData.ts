import { IOrder, IProduct, FormErrors, IOrderForm } from '../types';
import { Model } from './base/Model';
import { IAppState } from '../types';
import { IEvents } from './base/events';

export class Product extends Model<IProduct> {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected: boolean;

  constructor(data: IProduct, events: IEvents) {
    super(data, events);
    this.id = data.id;
    this.description = data.description;
    this.image = data.image;
    this.title = data.title;
    this.category = data.category;
    this.price = data.price;
    this.selected = data.selected;
  }
}

export class AppState extends Model<IAppState> {
  basket: Product[] = [];
  store: Product[] = [];
  order: IOrder = {
    items: [],
    payment: '',
    total: null,
    address: '',
    email: '',
    phone: '',
  };

  formErrors: FormErrors = {};

  addToBasket(value: Product): void {
    this.basket.push(value);
    this.emitChanges('basket:updated', { basket: this.basket });
  }

  deleteFromBasket(id: string): void {
    this.basket = this.basket.filter(item => item.id !== id);
    this.emitChanges('basket:updated', { basket: this.basket });
  }

  clearBasket(): void {
    this.basket.length = 0;
    this.emitChanges('basket:cleared');
  }

  getBasketAmount(): number {
    return this.basket.length;
  }

  setItems(): void {
    this.order.items = this.basket.map(item => item.id);
    this.emitChanges('order:itemsUpdated', { items: this.order.items });
  }

  setOrderField(field: keyof IOrderForm, value: string): void {
    this.order[field] = value;

    if (this.validateContacts()) {
      this.emitChanges('contacts:ready', this.order);
    }
    if (this.validateOrder()) {
      this.emitChanges('order:ready', this.order);
    }
  }

  validateContacts(): boolean {
    const errors: FormErrors = {};

    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }

    this.formErrors = errors;
    this.emitChanges('contactsFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  validateOrder(): boolean {
    const errors: FormErrors = {};

    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }

    this.formErrors = errors;
    this.emitChanges('orderFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  refreshOrder(): void {
    this.order = {
      items: [],
      total: null,
      address: '',
      email: '',
      phone: '',
      payment: ''
    };
    this.emitChanges('order:refreshed', this.order);
  }

  getTotalBasketPrice(): number {
    return this.basket.reduce((sum, next) => sum + (next.price ?? 0), 0);
  }

  setStore(items: IProduct[]): void {
    this.store = items.map(item => new Product({ ...item, selected: false }, this.events));
    this.emitChanges('items:changed', { store: this.store });
  }

  resetSelected(): void {
    this.store.forEach(item => item.selected = false);
    this.emitChanges('store:resetSelected');
  }
}
