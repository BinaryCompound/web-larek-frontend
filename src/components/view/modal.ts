import { IModal, TModal } from "../../types";
import { View } from "./View";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Modal extends View<TModal> implements IModal {
  _content: HTMLElement;
  buttonClose: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.container.addEventListener('mouseup', (event) => {
      if (event.target === event.currentTarget) { this.close() }
    });
    this._content = ensureElement<HTMLElement>('.modal__content', container);
    this.buttonClose = ensureElement<HTMLButtonElement>('.modal__close', container);
    this.buttonClose.addEventListener('click', () => this.close())
  }

  open() {
    console.log("Modal is opening"); 
    this.container.classList.add('modal_active')
    this.events.emit('modal:open')
  }

  close() {
    this.container.classList.remove('modal_active')
    this.events.emit('modal:close')
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }
}