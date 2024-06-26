import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipUndefinedProperties: true,
      skipNullProperties: true,
      skipMissingProperties: true,
    }),
  );
  await app.listen(parseInt(process.env['PORT']));
}
bootstrap();
