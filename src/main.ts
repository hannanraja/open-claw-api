import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/swagger.config';
import { ResponseInterceptor } from './interceptor/response.interceptor';

// Load .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  setupSwagger(app);
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();