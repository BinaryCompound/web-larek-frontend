import { IModal } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

export class Modal<IModal> extends View<IModal> {
  protected _content: HTMLElement;
  protected _buttonClose: HTMLButtonElement;

  constructor (containter: HTMLElement, events: IEvents) {
    super(containter, events)
    this._content = ensureElement<HTMLElement>('.modal__content', containter);
    this._buttonClose = ensureElement<HTMLButtonElement>('.modal__close', containter);

    this._buttonClose.addEventListener('click', ()=> {
      this.close()
    })

    this.container.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget)
      this.close()
    })
  }

  // открыть модальное окно
  open() {
    this.toggleClass(this.container, 'modal_active', true);
    this.events.emit('viewModal:open')
  }

  // закрыть модальное окно
  close() {
    this.toggleClass(this.container, 'modal_active', false);
    this.events.emit('viewModal:close');
  }

  // устанавливает содержания контента (вставить внутрь модального окна)
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }
}