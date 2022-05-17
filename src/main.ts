import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  if (process.env.INIT_HELMET === 'true') {
    app.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === 'production' ? undefined : false,
      }),
    );
  }
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, () =>
    console.log('App running on port', process.env.PORT),
  );
}
bootstrap();
