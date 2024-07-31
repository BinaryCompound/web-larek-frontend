# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура приложения
Код приложения разделён на слои согласно парадигме MVP:
- Слой представления - отвечает за отображение данных на странице
- Слой данных - отвечает за храниение и изменение данных
- Перезнтер - отвечает за связь представления и данных

## Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля:

- `readonly baseUrl: string` - базовый url для api
- `protected options: RequestInit`- объект с настройками для формирования запроса.
- 
Параметры в конструкторе:

- `baseUrl: string` - базовый url для api
- `options: RequestInit` - объект с настройками для формирования запроса.

Методы:

- `protected handleResponse(response: Response): Promise<object>` - обрабатывает ответа с сервера. Если ответ с сервера пришел, то возвращается его в формате json, в противном случае формирует ошибку
- `get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется POST запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.

Поля:

- `_events: Map<EventName, Set<Subscriber>>` - хранит события в виде Map, где ключом является строка или регулярное выражение, а значением сет коллбэков.
- 
Методы, геттеры и сеттеры:

- `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - подписка на событие
- `off(eventName: EventName, callback: Subscriber)` - отписка от события
- `emit<T extends object>(eventName: string, data?: T)` - инициализация события
- `onAll(callback: (event: EmitterEvent) => void)` - подписаться на все события (выполнить коллбек на любое событие)
- `offAll()` - для сброса событий
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

## Описание данных

Интерфейс продукта
```
export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    categoty: string;
    price: number | null;
}
```
Интерфейс управления продуктами
```
export interface IProductManager {
    setProducts(products: IProductItem[]): void;
    getAllProducts(): IProductItem[];
}
```

Интерфейс для модели данных Api
```
export interface IAppApi {
    getProducts(): Promise<IProductItem[]>;
    postOrder(order: IOrder): Promise<TSuccessData>;
  }
  ```

Интерфейс массива продуктов
```
export interface IProductList {
    total: number;
    items: string[];
}
```
Интерфейс заказа
```
export interface IOrder {
    payMethod: PaymentMethod;
    email: string;
    address: string;
    telephone: string;
    total: number;
    items: string[];
}
```
Интерфейс модальных окон
```
export interface IModal {
    content: HTMLElement;
    open(): void;
    close(): void;
}
```

### Слой данных

#### Класс ShoppingCart
Наследует интерфейс `IBasketData`.

В классе присутствуют следующие поля:
- `product: IProductItem[]` - предназначен для хранения продукта

В классе присутствуют следующие методы:
- `addProduct(product: IProductItem): void;` - добавить продукт в корзину.
- `removeProduct(product: IProductItem): void;` - удалить продукт из корзины.
- `getNumberOfProducts(): number;` - получить общее количество продуктов.
- `checkProduct(id: string): boolean;` - проверка, есть ли уже товар в корзине (чтобы не добавлять его ещё раз).
- `getProducts(): IProductItem[];` - получает массив продуктов 
- `getProductIds(): string[];` - получить массив id продуктов.
- `getTotalAmount(): number;` - получить общую сумму всех продуктов в корзине.

#### Класс ProductManager
Наследует интерфейс `IProductManager`

В классе присутствуют следующие поля:
- `private products: IProductItem[] = [];` - поле хранит в себе массив продуктов
В классе присутствуют следующие методы:
- `setProducts(products: IProductItem[]): void;`  - установка массива продуктов.
- `getAllProducts(): IProductItem[];` - получение всего массива продуктов.

#### Класс Modal 
В классе присуттсвуют следующие поля:
- `protected _content: HTMLElement;` - поле хранит в себе HTML элемент
- `protected buttonClose: HTMLButtonElement;` - поле хранит в себе кнопку

В классе присутствуют следующие методы:
- `open()`
- `close()`
В классе присутствует сеттер:
- `set content(value: HTMLElement)` - записывает изменённый контент в `HTMLElement`

### Классы представления

#### Класс View
Абстрактный класс View является дженериком и служит шаблоном для классов слоя представления

Поля:

- `protected _container: HTMLElement` - DOM элемент, передаваемый в конструкторе
- `protected events: IEvents` - объект класса EventEmitter для инициации событий при изменении данных.

Параметры в конструкторе:

- `container: HTMLElement` - DOM элемент компонента
- `events: IEvents` - объект класса EventEmitter для инициации событий при изменении данных.
Методы, геттеры и сеттеры:

- `render(data?: Partial<T>): HTMLElement` - возвращает отрисованный html элемент по переданным данным