import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

export class CardModal<T> extends View<T> {
  // DOM элемент для содержания модального окна
  protected _content: HTMLElement;

  // DOM элемент кнопки закрытия модального окна
  protected _buttonClose: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    // Находит элемент с классом '.modal__content' в контейнере модального окна
    this._content = ensureElement<HTMLElement>('.modal__content', container);

    // Находит элемент с классом '.modal__close' в контейнере модального окна
    this._buttonClose = ensureElement<HTMLButtonElement>('.modal__close', container);

    // Добавляет слушатель события клика на кнопку закрытия модального окна
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });

    // Добавляет слушатель события клика на контейнер модального окна для закрытия при клике вне содержимого
    this.container.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  // Открывает модальное окно
  open() {
    this.toggleClass(this.container, 'modal_active', true);
    this.events.emit('modal:open');
  }

  // Закрывает модальное окно
  close() {
    this.toggleClass(this.container, 'modal_active', false);
    this.events.emit('modal:close');
  }

  // Устанавливает содержание контента модального окна (заменяет текущее содержание)
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }
}