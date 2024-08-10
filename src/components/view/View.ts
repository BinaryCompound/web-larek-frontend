import { IEvents } from "../base/events";

export abstract class View<T> {
  protected container: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    this.container = container;
    this.events = events;
  }

  // Переключить класс
  toggleClass(element: HTMLElement, className: string, method?: boolean) {
    element.classList.toggle(className, method);
  }

  // Установить текстовое содержимое
  protected setText(element: HTMLElement, value: unknown) {
    if (element) {
      element.textContent = String(value);
    }
  }

  // Установить/снять статус блокировки
  setDisabled(element: HTMLElement, state: boolean) {
    if (element) {
      if (state) element.setAttribute('disabled', 'true');
      else element.removeAttribute('disabled');
    }
  }

  // Скрыть
  protected setHidden(element: HTMLElement) {
    element.style.display = 'none';
  }

  // Показать
  protected setVisible(element: HTMLElement) {
    element.style.removeProperty('display');
  }

  // Установить изображение 
  protected setImage(element: HTMLImageElement, src: string, alt?: string) {
    if (element) {
      element.src = src;
      if (alt) {
        element.alt = alt;
      }
    }
  }

  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}