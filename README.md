## Запуск проекта

### 1. Загрузка библиотек

```bash
npm i
```

### 2. Создание конфига

Конфиг можно создать автоматически или с помощью скрипта

* Автоматически. Команда запускает скрипт ./scripts/preconfig.sh

```bash
npm run preconfig
```

* Вручную создав файл - ./src/config.ts и заполнив его:
  ```typescript

  import { IConfig } from './config.type';

  export const config: IConfig = {
    API_KEY: 'hello',
    jwt_secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
    TELEGRAM_TOKEN: '1263254746:AAE2GwCrPrpuBLZg_Qncck590H6KcuiC3I8',
    port: 3000
  };
  ```

### 3. Запуск базы данных

Используется mongo на порту 27017

```bash
$ docker run -d -p 27017:27017 --name mongo mongo:latest
```

После запуска запуска базы данных и включения сервера, автоматически создастся база данных progresser

### 4. Добавление админа

Запустите mongosh и введите:

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

# Postgres

## Вход в psql контейнера

Чтобы зайти в терминал cli postgres psql:

1. Убедитесь что переменные окружение контейнера присутствуют, к примеру такие:

```json
{
	POSTGRES_USER: "admin",
	POSTGRES_PASSWORD: "qwerty",
	POSTGRES_DB: "calories"
}
```

2. Используя переменные окружение заходим в консоль

```bash
docker exec -it calories-postgres-1 psql -U admin -W calories
```

3. Вводим пароль

# Swagger

Сваггер находится по пути localhost:{port}/api
