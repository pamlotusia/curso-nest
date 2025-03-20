import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/*
- src/app.module.ts: modulo principal dp aplicativo
- src/app.controller.ts: define as rotas e lida com as requisições
- src/app.service.ts: contem a logica de negocio, separado do controlador
*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //if true, ela remove as chaves que não estão no DTO
    transform: true,
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
