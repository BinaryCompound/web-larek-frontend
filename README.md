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

Описание данных

Стэк приложения:
-TypeScript
-Scss
-webpack

Артхитектура проекта:
UML
![alt text](image-1.png)
![alt text](image.png)

====================================

Интерфейсы и Классы
Интерфейс IProduct
typescript
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
Интерфейс для представления продукта, включает следующие поля:

id: Уникальный идентификатор продукта.
description: Описание продукта.
image: Ссылка на изображение продукта.
title: Название продукта.
category: Категория продукта.
price: Цена продукта, может быть null.
Класс Product
typescript

class Product implements IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;

    constructor(id: string, description: string, image: string, title: string, category: string, price: number | null) {
        this.id = id;
        this.description = description;
        this.image = image;
        this.title = title;
        this.category = category;
        this.price = price;
    }
}
Реализация интерфейса IProduct. Конструктор инициализирует все поля продукта.

Интерфейс IBasket
typescript

interface IBasket {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}
Интерфейс для корзины покупок, включает следующие поля и методы:

items: Карта, содержащая идентификаторы продуктов и их количество.
add(id: string): Метод для добавления продукта в корзину по его идентификатору.
remove(id: string): Метод для удаления продукта из корзины по его идентификатору.
Класс Basket
typescript

class Basket implements IBasket {
    items: Map<string, number>;

    constructor() {
        this.items = new Map<string, number>();
    }

    add(id: string): void {
        if (this.items.has(id)) {
            this.items.set(id, this.items.get(id)! + 1);
        } else {
            this.items.set(id, 1);
        }
    }

    remove(id: string): void {
        if (this.items.has(id)) {
            const count = this.items.get(id)!;
            if (count > 1) {
                this.items.set(id, count - 1);
            } else {
                this.items.delete(id);
            }
        }
    }
}
Реализация интерфейса IBasket. Конструктор инициализирует пустую карту items. Методы add и remove управляют количеством продуктов в корзине.

Интерфейс ITopay
typescript

interface ITopay {
    paymentMethod: boolean;
    address: string;
}
Интерфейс для представления способа оплаты, включает следующие поля:

paymentMethod: Логическое значение, указывающее, используется ли данный способ оплаты.
address: Адрес доставки.
Класс ToPay
typescript

class ToPay implements ITopay {
    paymentMethod: boolean;
    address: string;

    constructor(paymentMethod: boolean, address: string) {
        this.paymentMethod = paymentMethod;
        this.address = address;
    }
}
Реализация интерфейса ITopay. Конструктор инициализирует поля paymentMethod и address.

Интерфейс IUser
typescript

interface IUser {
    email: string;
    telephone: string;
}
Интерфейс для представления данных о пользователе, включает следующие поля:

email: Электронная почта пользователя.
telephone: Телефонный номер пользователя.
Класс User
typescript

class User implements IUser {
    email: string;
    telephone: string;

    constructor(email: string, telephone: string) {
        this.email = email;
        this.telephone = telephone;
    }
}
Реализация интерфейса IUser. Конструктор инициализирует поля email и telephone.

Интерфейс IApiClient
typescript

interface IApiClient {
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
    put<T>(uri: string, data: object): Promise<T>;
    delete<T>(uri: string): Promise<T>;
}
Интерфейс для API клиента, включает следующие методы:

get<T>(uri: string): Выполняет GET запрос по заданному URI и возвращает Promise с данными типа T.
post<T>(uri: string, data: object, method?: ApiPostMethods): Выполняет POST запрос по заданному URI с переданными данными и возвращает Promise с данными типа T.
put<T>(uri: string, data: object): Выполняет PUT запрос по заданному URI с переданными данными и возвращает Promise с данными типа T.
delete<T>(uri: string): Выполняет DELETE запрос по заданному URI и возвращает Promise с данными типа T.
Общее
Эти интерфейсы и классы позволяют создать систему для управления продуктами, корзиной, способом оплаты и пользователями, а также обеспечивают базовые методы для взаимодействия с внешним API.