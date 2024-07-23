import { IProductItem, IProductManager } from "../types";

class ProductManager implements IProductManager {
    private products: IProductItem[] = [];

    setProducts(products: IProductItem[]): void {
        this.products = products;
    }

    getAllProducts(): IProductItem[] {
        return this.products;
    }
}