## Запуск проекта

### 1. Загрузка библиотек

```bash
npm i
```

### 2. Создание конфига

Конфиг можно создать автоматически или с помощью скрипта

* Автоматически

```bash
npm run preconfig
```

* В ручную создав файл - ./src/config.ts и заполнив его:
  ```ts
  import { IConfig } from './config.type';

  export const config: IConfig = {
    API_KEY: 'hello',
    jwt_secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
    TELEGRAM_TOKEN: '${Ваш телеграм токен}'
  };
  ```

### 3. Запуск базы данных

Используется mongo на порту 27017

```bash
$ docker run -d -p 27017:27017 --name mongo mongo:latest
```

После запуска запуска базы данных и включения сервера, автоматически создастся база данных progresser

### 4. Добавление админа

Запуск терминала в контейнере

```ts
use('progresser')

db.getCollection('users').insertOne({
    userName: 'admin',
    password: 'admin admin',
    role: 'admin',
});

```

## Архитектура

### Система авторизация

Авторизация сделана на jwt токене.

Используется глобальные гард AuthGuard, который отбрасывает всех неавторизованных пользователей.

Для публичного эндпоинта используется декоратор [@Public](./src/auth/auth.decorators.ts)
