import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Progresser')
    .setDescription('Core module for web app')
    .setVersion('0.1')
    .addTag('For you, for me, for world')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
