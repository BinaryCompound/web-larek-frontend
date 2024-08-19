import { IBasketData, IProductItem } from "../../types";
import { IEvents } from '../base/events';

export class ShoppingCart implements IBasketData {
    protected _goods: IProductItem[] = [];
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    get goods() {
        return this._goods;
    }

    set goods(cards: IProductItem[]) {
        this._goods = cards;
        this.checkEmpty();  // Проверяем корзину на пустоту при изменении товаров
    }

    isInBasket(id: string): boolean {
        return Boolean(this._goods.find(good => good.id === id));
    }

    checkBasket(id: string): void {
        if (this.isInBasket(id)) {
            this.events.emit('addToBasket:disabled');
        }
    }

    addToBasket(card: IProductItem): void {
        this._goods.push(card);
        this.checkEmpty();
        this.events.emit('basketData:changed', { id: card.id });
    }

    removeFromBasket(id: string): void {
        this._goods = this._goods.filter(good => good.id !== id);
        this.checkEmpty();
        this.events.emit('basketData:changed', { id });
    }

    clearBasket(): void {
        this._goods = [];
        this.checkEmpty();
        this.events.emit('basketData:changed', this._goods);
    }

    getGoodsNumber(): number {
        return this._goods.length;
    }

    getTotal(): number {
        return this._goods.reduce((sum, good) => sum + good.price, 0);
    }

    getIdsOfGoods(): string[] {
        return this._goods.map(good => good.id);
    }

    private checkEmpty(): void {
        if (this._goods.length === 0) {
            this.events.emit('basket:empty');
        } else {
            this.events.emit('basket:has-items');
        }
    }
}
