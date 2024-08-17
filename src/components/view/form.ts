import { IForm, TForm } from '../../types/index';
import { View } from '../view/View';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export abstract class Form<T> extends View<TForm> implements IForm {
    // DOM элемент формы
    protected container: HTMLFormElement;

    // Все поля ввода формы
    protected inputs: HTMLInputElement[];

    // Кнопка сабмита формы
    protected submitButton: HTMLButtonElement;

    // Спан с текстом ошибки
    protected errorSpan: HTMLSpanElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        // Находит все элементы с классом '.form__input' в DOM элементе формы
        this.inputs = ensureAllElements<HTMLInputElement>('.form__input', container);

        // Находит элемент с классом '.button' и типом 'submit' в DOM элементе формы
        this.submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]', container);

        // Находит элемент с классом '.form__errors' в DOM элементе формы
        this.errorSpan = ensureElement<HTMLSpanElement>('.form__errors', container);

        // Добавляет слушатель события клика на кнопку сабмита формы и эмитит событие 'form:submit'
        this.submitButton.addEventListener('click', () => {
            this.events.emit(`${this.container.name}:submit`);
        });

        // Добавляет слушатель события ввода данных в инпут и эмитит событие 'form:valid'
        this.inputs.forEach(input => {
            input.addEventListener('input', () =>
                this.events.emit(`${this.container.name}:valid`))
        });
    }

    // Активация/блокировка кнопки сабмита в зависимости от валидности формы
    set valid(state: boolean) {
        this.setDisabled(this.submitButton, !state);
    }

    // Проверка валидности формы (валидна/невалидна)
    get valid(): boolean {
        const check = this.inputs.every((input) => { return input.value.length !== 0 });
        return check;
    }

    // Установка сообщения об ошибке
    set errorMessage(value: string) {
        this.setText(this.errorSpan, value);
    }

    // Очистка формы
    clear() {
        this.container.reset();
    }

    // Рендер формы с данными
    render(data: Partial<T> & TForm) {
        const { valid, errorMessage, ...inputs } = data;
        super.render({ valid, errorMessage });
        Object.assign(this, inputs);
        return this.container;
    }
}