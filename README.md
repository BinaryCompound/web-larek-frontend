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

## Описание проекта

Веб-приложение для покупки различных интересных продуктов. Приложение состоит из следующих основных компонентов: модели, представления и презентеры.

## Архитектура проекта

## Описание данных:


# Интерфейс товаров (IProduct)

Определяет структуру объектов, представляющих товары.

- `id`: Уникальный идентификатор товара (строка).
- `description`: Описание товара (строка).
- `image`: URL изображения товара (строка).
- `title`: Название товара (строка).
- `category`: Категория товара (строка).
- `price`: Цена товара (число или null).

# Интерфейс корзины (IBasket)
- `items`: Массив товаров в корзине (массив объектов типа IProduct).
- `add(id: string)`: Метод для добавления товара в корзину по его идентификатору.
- `remove(id: string)`: Метод для удаления товара из корзины по его идентификатору.

# Интерфейс заказа (IOrder)

Определяет структуру объектов, представляющих заказ.

- `paymentMethod`: Метод оплаты заказа (строка).
- `address`: Адрес доставки (строка).
- `email`: Email адрес заказчика (строка).
- `telephone`: Номер телефона заказчика (строка).

# Интерфейс пользователя (IUser)

Определяет структуру объектов, предоставляющие данные о пользователе

- `email`: Email адрес пользователя(строка);
- `telephone`: Номер телефона пользователя(строка);

 # API-клиент
API-клиент предоставляет удобный интерфейс для взаимодействия с удаленным API.

## Методы
- get(uri: string): Promise<object>
- Отправляет GET-запрос к указанному ресурсу.

### Параметры
- uri: Строка - URI ресурса.
- Возвращаемое значение
- Promise, который разрешается в объект с данными ответа.

- post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>
- Отправляет POST-запрос к указанному ресурсу.

### Параметры
- uri: Строка - URI ресурса.
- data: Объект - данные для отправки.
- method: 'POST' | 'PUT' | 'DELETE' - метод запроса (по умолчанию 'POST').
- Возвращаемое значение
- Promise, который разрешается в объект с данными ответа.

### Типы данных
- ApiListResponse<Type>
- Общий тип данных, представляющий ответ от API, который включает в себя общее количество элементов и массив элементов указанного типа.

type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

### ApiPostMethods
- Тип данных, который ограничивает методы запроса для POST-запросов, PUT-запросов и DELETE-запросов.

type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


# Классы моделей данных

## Класс "Товар" (Product)
### Состав:
- `id`: Уникальный идентификатор товара (строка).
- `description`: Описание товара (строка).
- `image`: URL изображения товара (строка).
- `title`: Название товара (строка).
- `category`: Категория товара (строка).
- `price`: Цена товара (число или null).
### Назначение:
Этот класс предназначен для хранения информации о товарах в системе. Он обеспечивает структурированное представление данных о товаре, включая его основные характеристики, такие как описание, изображение, название, категория и цена.

## Класс "Корзина" (Basket)
### Состав:
- `items`: Массив товаров в корзине (массив объектов типа Product).
- `Методы`:
- `add(id: string)`: Добавляет товар в корзину по его идентификатору.
- `remove(id: string)`: Удаляет товар из корзины по его идентификатору.
### Назначение:
Этот класс предназначен для хранения и управления товарами, добавленными в корзину пользователем. Он предоставляет методы для добавления и удаления товаров из корзины, а также обеспечивает доступ к текущему списку товаров в корзине.

## Класс "Заказ" (Order)
### Состав:
- `paymentMethod`: Метод оплаты заказа (строка).
- `address`: Адрес доставки (строка).
- `email`: Email адрес заказчика (строка).
- `telephone`: Номер телефона заказчика (строка).
### Назначение:
Этот класс предназначен для хранения информации о заказах в системе. Он содержит основные данные о заказе, такие как метод оплаты, адрес доставки, контактная информация заказчика и другие детали заказа.

## Класс "Пользователь" (User)
### Состав:
- `email`: Email адрес пользователя (строка).
- `telephone`: Номер телефона пользователя (строка).
### Назначение:
Этот класс предназначен для хранения информации о пользователях системы. Он содержит основные контактные данные пользователя, такие как email адрес и номер телефона, которые могут использоваться для связи с пользователем и обработки его заказов.

Эти классы предоставляют основные модели данных для работы с товарами, корзиной, заказами и пользователями в вашей системе. Они обеспечивают удобный способ организации и управления данными, а также понимание их использования и функционала в рамках вашего приложения.





