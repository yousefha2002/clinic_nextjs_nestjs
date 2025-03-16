import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule,new ExpressAdapter(server));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  await app.listen(3250);
}
bootstrap();