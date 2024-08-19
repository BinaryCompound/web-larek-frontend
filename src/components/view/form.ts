import { IForm, TForm } from '../../types/index';
import { View } from '../view/View';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export abstract class Form<T> extends View<TForm> implements IForm {
    protected container: HTMLFormElement;
    protected inputs: HTMLInputElement[];
    protected submitButton: HTMLButtonElement;
    protected errorSpan: HTMLSpanElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.inputs = ensureAllElements<HTMLInputElement>('.form__input', container);
        this.submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]', container);
        this.errorSpan = ensureElement<HTMLSpanElement>('.form__errors', container);

        this.submitButton.addEventListener('click', () => {
            this.events.emit(`${this.container.name}:submit`);
        });

        this.inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.events.emit(`${this.container.name}:valid`);
                this.updateValidity();  // Добавляем обновление валидности
            });
        });
    }

    set valid(state: boolean) {
        this.setDisabled(this.submitButton, !state);
    }

    get valid(): boolean {
        return this.inputs.every((input) => input.value.length !== 0);
    }

    set errorMessage(value: string) {
        this.setText(this.errorSpan, value);
    }

    clear() {
        this.container.reset();
    }

    render(data: Partial<T> & TForm) {
        const { valid, errorMessage, ...inputs } = data;
        super.render({ valid, errorMessage });
        Object.assign(this, inputs);
        return this.container;
    }

    // Новый метод для обновления валидности
    private updateValidity() {
        const isValid = this.valid;
        this.valid = isValid;

        // Обновляем сообщение об ошибке
        if (isValid) {
            this.errorMessage = '';
        } else {
            this.errorMessage = 'Заполните все обязательные поля';
        }
    }
}