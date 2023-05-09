## Installation

```bash
$ npm install
```

## Running the app

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
