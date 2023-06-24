#!/bin/sh

# 1. Создание конфига

if ! [ -f "./src/config.ts" ]; 
  then 
  touch ./src/config.ts

  API_KEY="hello"
  TELEGRAM_TOKEN="Ваш телеграм токен"
  JWT_SECRET="DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE."
  port=3000

  echo "
import { IConfig } from './config.type';

export const config: IConfig = {
  API_KEY: '${API_KEY}',
  jwt_secret: '${JWT_SECRET}',
  TELEGRAM_TOKEN: '${TELEGRAM_TOKEN}',
  port: ${port}
};
" > ./src/config.ts

fi
