import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2'); //seteamos el prefijo para los entrypoints
  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist:true, //permite adicionar propiedaes en blanco en el body pero no los toma en cuenta
        forbidNonWhitelisted:true, //devuelve mensaje de error cuando se envia propiedades que no se esperaban en el body
        transform:true,
        transformOptions:{
          enableImplicitConversion:true //esta linea y la anterior convirtenen numero lo query params
        }
      }
    )
  )
  await app.listen(process.env.PORT);
}
bootstrap();
