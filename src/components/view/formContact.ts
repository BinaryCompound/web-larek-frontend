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
      this.events.emit('email:input', { email: this.emailInput.value }); 
      this.events.emit('contacts:input', this.getFormData());
    });
    this.telephoneInput.addEventListener('input', () => {
      this.events.emit('telephone:input', { phone: this.telephoneInput.value });
      this.events.emit('contacts:input', this.getFormData());
    });
  }

  get email() {
    return this.emailInput.value;
  }

  get phone() {
    return this.telephoneInput.value;
  }

  private getFormData(): TFormContacts {
    return {
      email: this.emailInput.value,
      phone: this.telephoneInput.value,
      valid: this.valid
    };
  }

  get valid(): boolean {
    return super.valid;
  }

  set valid(value: boolean) {
    super.valid = value;
  }
}