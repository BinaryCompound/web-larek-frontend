/*import { IBasketData, IProductItem } from "../../types";
import { IEvents } from '../base/events';

class ShoppingCart implements IBasketData {
    private products: IProductItem[] = [];
  
    // Добавить продукт в корзину
    addProduct(product: IProductItem): void {
      if (!this.checkProduct(product.id)) {
        this.products.push(product);
      } else {
        console.log(`Продукт с id ${product.id} уже в корзине.`);
      }
    }
  
    // Удалить продукт из корзины
    removeProduct(product: IProductItem): void {
      this.products = this.products.filter(p => p.id !== product.id);
    }
  
    // Получить общее количество продуктов
    getNumberOfProducts(): number {
      return this.products.length;
    }
  
    // Проверка, есть ли уже товар в корзине
    checkProduct(id: string): boolean {
      return this.products.some(p => p.id === id);
    }
  
    // Получить массив продуктов
    getProducts(): IProductItem[] {
      return this.products;
    }
  
    // Получить массив id продуктов
    getProductIds(): string[] {
      return this.products.map(p => p.id);
    }
  
    // Получить общую сумму всех продуктов в корзине
    getTotalAmount(): number {
      return this.products.reduce((total, product) => {
        return total + (product.price !== null ? product.price : 0);
      }, 0);
    }
  }
    */