## Installation

```bash
npm i
npm run preconfig
```

## config.ts

Конфигрурацинный файл находится в ./src/config.ts

```ts
import { IConfig } from './config.type';

export const config: IConfig = {
  API_KEY: 'hello',
  jwt_secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  TELEGRAM_TOKEN: '${Ваш телеграм токен}'
};


```

API_KEY???

jwtConstants???

В проекте настроен телеграм бот, для интеграции системы с вашим ботом

## Running the app

1. Создайте .env

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Система авторизация

Авторизация сделана на jwt токене.

Используется глобальные гард AuthGuard, который отбрасывает всех неавторизованных пользователей.

Для публичного эндпоинта используется декоратор [@Public](./src/auth/auth.decorators.ts)

## Запуск базы данных

Используется mongo db.

```bash
gdfgfd


```
