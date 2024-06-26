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
- src/styles.scss — корневой файл стилей
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

# Архитектура приложения

**MVP**
- Model (Модель) работает с данными, проводит вычисления и руководит всеми бизнес-процессами.
- View (Вид или представление) показывает пользователю интерфейс и данные из модели.
- Presenter (Представитель) служит прослойкой между моделью и видом.

## Описание проекта
Этот проект реализован с использованием архитектурного шаблона MVP (Model-View-Presenter). В проекте используется TypeScript для типизации данных и классов. Ниже описаны основные типы данных, модели, классы представления и события, используемые в проекте.

## Типы данных

### CategoryType
Тип, описывающий категории товара.
- `другое`
- `софт-скил`
- `дополнительное`
- `кнопка`
- `хард-скил`

### FormErrors
Тип, описывающий ошибки валидации форм. Ключи соответствуют полям формы, а значения — сообщения об ошибках.

### IProduct
Интерфейс, описывающий карточку товара в магазине:
- `id`: Уникальный идентификатор товара.
- `description`: Описание товара.
- `image`: Ссылка на изображение товара.
- `title`: Название товара.
- `category`: Категория товара.
- `price`: Цена товара, может быть `null`.
- `selected`: Указывает, добавлен ли товар в корзину.

### IAppState
Интерфейс, описывающий внутреннее состояние приложения. Хранит данные о карточках товаров, корзине, заказах пользователя и ошибках валидации форм. Также содержит методы для работы с этими данными:
- `basket`: Корзина с товарами.
- `store`: Массив карточек товара.
- `order`: Информация о заказе при покупке товара.
- `formErrors`: Ошибки при заполнении форм.
- Методы для работы с корзиной и заказом (addToBasket, deleteFromBasket, clearBasket, getBasketAmount, getTotalBasketPrice, setItems, setOrderField, validateContacts, validateOrder, refreshOrder, setStore, resetSelected).

### IOrder
Интерфейс, описывающий поля заказа товара:
- `items`: Массив ID купленных товаров.
- `payment`: Способ оплаты.
- `total`: Сумма заказа.
- `address`: Адрес доставки.
- `email`: Электронная почта.
- `phone`: Телефон.

### ICard
Интерфейс, описывающий карточку товара:
- `id`: Уникальный идентификатор товара.
- `title`: Название товара.
- `category`: Категория товара.
- `description`: Описание товара.
- `image`: Ссылка на изображение товара.
- `price`: Цена товара, может быть `null`.
- `selected`: Указывает, добавлен ли товар в корзину.

### IPage
Интерфейс, описывающий страницу:
- `counter`: Счётчик товаров в корзине.
- `store`: Массив карточек с товарами.
- `locked`: Переключатель для блокировки прокрутки страницы.

### IBasket
Интерфейс, описывающий корзину товаров:
- `list`: Массив элементов `li` с товарами.
- `price`: Общая цена товаров.

### IOrder
Интерфейс, описывающий окошко заказа товара:
- `address`: Адрес доставки.
- `payment`: Способ оплаты.

### IContacts
Интерфейс, описывающий окошко контакты:
- `phone`: Телефон.
- `email`: Электронная почта.

## Модели данных

### Model
Базовая модель, чтобы можно было отличить её от простых объектов с данными:
- Конструктор принимает данные для хранения и объект событий.
- Метод `emitChanges` вызывает событие.

### AppState
Класс, описывающий состояние приложения. Наследуется от `Model<IAppState>`:
- `basket`: Корзина с товарами.
- `store`: Массив со всеми товарами.
- `order`: Объект заказа клиента.
- `formErrors`: Объект с ошибками форм.
- Методы для работы с корзиной, заказом и формами (addToBasket, deleteFromBasket, clearBasket, getBasketAmount, getTotalBasketPrice, setItems, setOrderField, validateContacts, validateOrder, refreshOrder, setStore, resetSelected).

## Классы представления

### Component
Базовый компонент:
- Конструктор принимает родительский элемент.
- Методы для работы с DOM (toggleClass, setText, setDisabled, setHidden, setVisible, setImage, render).

### Page
Класс, описывающий главную страницу. Наследуется от `Component<IPage>`:
- Ссылки на внутренние элементы страницы (`_counter`, `_store`, `_wrapper`, `_basket`).
- Конструктор принимает родительский элемент и обработчик событий.
- Сеттеры для счётчика товаров, карточек товаров и блока прокрутки (counter, store, locked).

### Card
Класс, описывающий карточку товара. Наследуется от `Component<ICard>`:
- Ссылки на внутренние элементы карточки (`_title`, `_image`, `_category`, `_price`, `_button`).
- Конструктор принимает имя блока, родительский контейнер и объект с колбэк-функциями.
- Сеттеры и геттеры для свойств карточки (id, title, image, selected, price, category).

### Basket
Класс, описывающий корзину товаров. Наследуется от `Component<IBasket>`:
- Ссылки на внутренние элементы корзины (`_list`, `_price`, `_button`).
- Конструктор принимает имя блока, родительский элемент и обработчик событий.
- Сеттеры для общей цены и списка товаров (price, list).
- Методы для управления корзиной (disableButton, refreshIndices).

### Order
Класс, описывающий окошко заказа товара. Наследуется от `Form<IOrder>`:
- Ссылки на внутренние элементы (`_card`, `_cash`).
- Конструктор принимает имя блока, родительский элемент и обработчик событий.
- Метод для отключения подсвечивания кнопок (disableButtons).

### Contacts
Класс, описывающий окошко контакты. Наследуется от `Form<IContacts>`:
- Конструктор принимает родительский элемент и обработчик событий.

## Классы

### Api
Класс для работы с API:
- Конструктор принимает базовый URL и опции.
- Метод `handleResponse` обрабатывает запрос и возвращает промис с данными.
- Методы `get` и `post` для отправки GET и POST запросов.

### EventEmitter
Класс для обработки событий:
- Конструктор создаёт Map событий и подписчиков.
- Методы `on`, `off` и `emit` для управления подписками и вызовом событий.
"""

### Описание событий

`'items:changed'`
- Инициируется при изменении списка товаров и вызывает перерисовку
    списка товаров на странице
  
`'card:select'`
- Инициируется при клике на карточку товара в классе StoreItem и приводит
    к открытию модального окна с подробным описанием товара
  
`'card:toBasket'`
-  Инициируется при клике на кнопку "В корзину" на карточке StoreItemPreview
    В AppState добавляет товар в корзину, обновляет счётчик на корзине
    в классе Page
    Делает поле selected на товаре true для отключения кнопки, чтобы больше
    товар добавить было нельзя
  
`'basket:open'`
-    Инициируется при клике на кнопку "корзина" и открывает модальное окно
    с классом Basket, где отображаются товары добавленные в корзину
  
`'basket:delete'`
- Инициируется при клике на кнопку удаления товара в корзине
- Удаляет товар из массива basket в классе AppData
- Обновляет счётчик корзины на странице
- Обновляет поле selected на товаре, делая его false
- Обновляет сумму заказа в корзине
- Обвновляет порядковые номера в списке корзины
  
`'basket:order'`

- Инициируется при клике на кнопку "Оформить" в корзине
    Открывает окно с формой для заполнения адреса и способа оплаты
    Используемый класс Order
  
`'order:submit'`

-    Инициируется при нажатии на кнопку "Далее" на стадии заполнения адреса и
    способа оплаты в окошке Order
  
`'contacts:submit'`

-    Инициируется при нажатии на кнопку "Оплатить" на стадии заполнения телефона
    и электронной почты в окошке Contacts
  
`'orderInput:change'`

-    Инициируется при вводе данных в форму заказа Order и контактов Contacts
    Начинает процесс валидации формы

  
`'orderFormErrors:change'`

- Инициируется при вводе данных в форму окошка Order и совершает
    процесс валидации формы, возвращает ошибки формы

`'contactsFormErrors:change'`
- Инициируется при вводе данных в форму окошка Contacts и совершает
    процесс валидации формы, возвращает ошибки формы

`'order:success'`
- Инициируется при успешном ответе сервера при оплате товара
    Открывает модальное окно сообщающее об успешной оплате

`'modal:close'`
- Инициируется при клике на кнопку закрытия модального окна
    или при клике на свободное место вокруг модального окна