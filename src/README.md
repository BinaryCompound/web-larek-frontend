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
# Описание данных

## Базовый код:
 API
- `export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};`
Этот тип `ApiListResponse<Type>` описывает структуру ответа API, который возвращает список элементов. Он содержит два поля: `total` — общее количество элементов, и `items` — массив элементов типа Type.
- `export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';`
Тип `ApiPostMethods` определяет возможные HTTP методы, которые можно использовать в методе `post` класса Api: `POST`, `PUT` и `DELETE`.