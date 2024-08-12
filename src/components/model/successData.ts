import { IEvents } from '../base/events';
import { IOrderSuccess, TOrderSuccess } from '../../types/index';

export class Success implements IOrderSuccess {
    protected _orderSuccess: TOrderSuccess;
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }
    //Записывает общее колл-во товаров
    set orderSuccess(value: TOrderSuccess) {
        this._orderSuccess = value;
    }
    //Возвращает общее колл-во товаров
    get orderSuccess() {
        return this._orderSuccess;
    }
}