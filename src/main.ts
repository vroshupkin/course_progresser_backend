import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as config_env } from './config';


async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Progresser')
    .setDescription('Core module for web app')
    .setVersion('0.1')
    .addTag('For you, for me, for world')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  
  await app.listen(config_env.port);
}
bootstrap();
