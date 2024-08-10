import { IProductCatalog, TProductCatalog } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

export class ProductItemCatalogue<TProductCatalog> extends View<TProductCatalog> implements IProductCatalog {
    category: string;
    id: string;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events)
        this.container.addEventListener('click', () => this.events.emit('productCatalog:open', { id: this.id }))
    }
}