import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import { logger } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../', 'public'), { prefix: '/static' });
  app.use(
    session({
      secret: 'guang',
      cookie: { maxAge: 1000 },
    }),
  );
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
