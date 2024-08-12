import { IFormUserContacts, TFormContacts } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./form";

export class FormContacts extends Form<TFormContacts> implements TFormContacts {
  protected emailInput: HTMLInputElement;
  protected telephoneInput: HTMLInputElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.emailInput = ensureElement<HTMLInputElement>('.form__input[name=email]', container);
    this.telephoneInput = ensureElement<HTMLInputElement>('.form__input[name=phone]', container);

    this.emailInput.addEventListener('input', () => {
      this.events.emit('email:input'); 
      this.events.emit('contacts:valid');
    });
    this.telephoneInput.addEventListener('input', () => {
      this.events.emit('telephone:input');
      this.events.emit('contacts:valid');
    });
  }

  get email() {
    return this.emailInput.value;
  }

  get phone() {
    return this.telephoneInput.value;
  }

  get valid() {
    const emailFilled = this.emailInput.value.trim() !== '';
    const telephoneFilled = this.telephoneInput.value.trim() !== '';

    if (emailFilled && telephoneFilled) {
      this.errorMessage = '';
      return true;
    }

    if (!emailFilled && !telephoneFilled) {
      this.errorMessage = 'Заполните поля электронной почты и телефона';
    } else if (!emailFilled) {
      this.errorMessage = 'Заполните поле электронной почты';
    } else if (!telephoneFilled) {
      this.errorMessage = 'Заполните поле телефона';
    }

    return false;
  }

  set valid(value: boolean) {
    super.valid = value;
  }
}