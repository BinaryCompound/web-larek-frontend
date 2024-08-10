import { Form } from "./form";
import { IFormOrder, PaymentMethod, TForm, TFormOrder, TPlacingOrderInfo } from "../../types";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";



export class FormOrder extends Form<TFormOrder> implements IFormOrder{ //форма заказа с способом оплаты и адресом доставки 
  protected buttonsContainer: HTMLDivElement; //контейнер с кнопками
  protected buttonOnline: HTMLButtonElement; //кнопка оплаты онлайн   
  protected buttonOnDelivery: HTMLButtonElement; //кнопка оплаты по получении
  protected addressInput: HTMLInputElement; //поле ввода адреса

  constructor(container: HTMLFormElement, events:IEvents) {
    super(container, events);
    this.buttonsContainer = ensureElement<HTMLDivElement>('.order__buttons', container);
    this.buttonOnline = ensureElement<HTMLButtonElement>('.button[name=card]', container);
    this.buttonOnDelivery = ensureElement<HTMLButtonElement>('.button[name=cash]', container);
    this.addressInput = ensureElement<HTMLInputElement>('.form__input[name=address]', container);
   
    this.buttonOnDelivery.addEventListener('click', () => {
      this.toggleClass(this.buttonOnDelivery,'button_alt-active', true) 
      this.toggleClass(this.buttonOnline, 'button_alt-active', false)
      this.events.emit('payment:input')
      this.events.emit('order:valid')
    })

    this.buttonOnline.addEventListener('click', () => {
      this.toggleClass(this.buttonOnline,'button_alt-active', true) 
      this.toggleClass(this.buttonOnDelivery, 'button_alt-active', false)
      this.events.emit('payment:input')
      this.events.emit('order:valid')
    })

    this.addressInput.addEventListener('input', () => {
      this.events.emit('address:input')
      this.events.emit('order:valid')
    } )
    }
    orderPayment: TPlacingOrderInfo;

    // возвращает кнопку, которая активна
  protected getButtonActive(): HTMLButtonElement | null {
    if(this.buttonOnline.classList.contains('button_alt-active')) {
      return this.buttonOnline
    } 

    else if(this.buttonOnDelivery.classList.contains('button_alt-active')) {
      return this.buttonOnDelivery
    }

    return null;
  }

  //сбрасывает активный статус кнопки
  resetButtons(): void {
    this.toggleClass(this.buttonOnline, '.button_alt-active', false);
    this.toggleClass(this.buttonOnDelivery, '.button_alt-active', false);
  }

  // устанавливает метод платежа 
  set payment (value: PaymentMethod | null) {                                    
    if (this.buttonOnDelivery.classList.toggle('.button_alt-active', true)) {
      value === 'cash'
    }
    else if (this.buttonOnline.classList.toggle('.button_alt-active', true)) {
      value === 'card'
    }
    value === null
  }

  // возвращает имя активной кнопки
  get payment() {
    const buttonActive = this.getButtonActive();
    return buttonActive ? buttonActive.name as PaymentMethod : null
  }

  // записывает адрес
  get address() {
    return this.addressInput.value
  }

  //возвращает "валидность"
  get valid() {
    if (Boolean(this.addressInput.value) === true && (Boolean(this.payment) === true)) {
      this.errorMessage = '';
      return true
    }

    else if (Boolean(this.addressInput.value) === false) {
      this.errorMessage = 'Заполните поле адреса'
      return false
    }    
    else if  (Boolean(this.payment) === false) {
      this.errorMessage = 'Выберите метод платежа'
      return false
    }
    return true
  }

  //устанавливает "валидность"
  set valid(value: boolean) {
    super.valid = value;
  }
  
  //очищает форму, сбрасывает кнопки
  clear(){
    super.clear();
    this.resetButtons();
  }
}