import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

export class CardModal<T> extends View<T> {
  protected _content: HTMLElement;
  protected _buttonClose: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._content = ensureElement<HTMLElement>('.modal__content', container);
    this._buttonClose = ensureElement<HTMLButtonElement>('.modal__close', container);

    this._buttonClose.addEventListener('click', () => {
      this.close();
    });

    this.container.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  // Открыть модальное окно
  open() {
    this.toggleClass(this.container, 'modal_active', true);
    //this.events.emit('productModal:open');
  }

  // Закрыть модальное окно
  close() {
    this.toggleClass(this.container, 'modal_active', false);
    this.events.emit('viewModal:close');
  }

  // Устанавливает содержание контента (вставить внутрь модального окна)
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

}
