import { IForm, TForm } from '../../types/index';
import { View } from '../view/View';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export abstract class Form<T> extends View<TForm> implements IForm {
    protected container: HTMLFormElement; //DOM элемент формы
    protected inputs: HTMLInputElement[]; //все поля ввода формы
    protected submitButton: HTMLButtonElement; //кнопка сабмита формы
    protected errorSpan: HTMLSpanElement; //спан с текстом ошибки

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.inputs = ensureAllElements<HTMLInputElement>('.form__input', container); //находит все элементы с классом '.form__input' в DOM элементе формы
        this.submitButton = ensureElement<HTMLButtonElement>('.button[type=submit]', container); //находит элемент с классом '.button' в DOM элементе формы
        this.errorSpan = ensureElement<HTMLSpanElement>('.form__errors', container); //находит элемент с классом '.form__errors' в DOM элементе формы

        //слушатель события на сабмит формы с эмитом брокера события form:submit
        this.submitButton.addEventListener('click', () => {
            this.events.emit(`${this.container.name}:submit`);
        })

        //слушатель события на ввод данных инпута с эмитом брокера события form:valid
        this.inputs.forEach(input => {
            input.addEventListener('input', () =>
                this.events.emit(`${this.container.name}:valid`))
        });
    }

    //активация/блокировка кнопки сабмита при валидности/невалидности кнопки 
    set valid(state: boolean) {
        this.setDisabled(this.submitButton, !state);

    }

    //проверка валидности формы (валидна/невалидна)
    get valid(): boolean {
        const check = this.inputs.every((input) => { return input.value.length !== 0 })
        return check
    }

    // установка сообщения об ошибке
    set errorMessage(value: string) {                                             
        this.setText(this.errorSpan, value);
    }

    // очистка формы
    clear() {
        this.container.reset
    }

    // рендер формы
    render(data: Partial<T> & TForm) {
        const { valid, errorMessage, ...inputs } = data;
        super.render({ valid, errorMessage });
        Object.assign(this, inputs);
        return this.container;
    }
}