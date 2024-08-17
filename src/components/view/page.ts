import { IPage } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

export class Page<IPage> extends View<IPage> {
   protected _gallery: HTMLElement;
   protected buttonBasket: HTMLButtonElement;
   protected _counter: HTMLSpanElement;
   protected screen: HTMLDivElement;

   constructor(container: HTMLElement, events: IEvents) {
      super(container, events);
      this.buttonBasket = ensureElement<HTMLButtonElement>('.header__basket', container);
      this.buttonBasket.addEventListener('click', () => events.emit('viewBasket:open'));
      this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this.buttonBasket);
      this._gallery = ensureElement<HTMLElement>('.gallery', container);
      this.screen = ensureElement<HTMLDivElement>('.page__wrapper', container)
   }

   // устанавливает содержание каталога карточек - заменяет отрендеренными карточками товаров имеющиеся в каталоге 
   set catalog(viewCards: HTMLElement[]) {
      this._gallery.replaceChildren(...viewCards)
   }

   // устанавливает значение счетчика товаров в корзине
   set counter(value: number) {
      this._counter.textContent = String(value);
   }

   // блокирует экран (добавляет соответствующие класс экрану)
   lockScreen(value: boolean) {
      console.log(`вызывается со значением: ${value}`);
      if (value) {
         this.screen.classList.add('page__wrapper_locked')
         console.log('Screen locked');
      }
      else {
         this.screen.classList.remove('page__wrapper_locked')
         console.log('Экран разблокирован');
      }
   }
}