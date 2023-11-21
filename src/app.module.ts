import { Module, Provider, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule } from './config/config.module';

const configFactory: Provider = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development'
      ? { env: 'dev' }
      : { env: 'pro' };
  },
};

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'person',
      useValue: {
        name: 'a',
      },
    },
    configFactory,
    {
      provide: 'ASYNC_CONNECTION',
      useFactory: async () => {
        return { a: 1 };
      },
    },
  ],
  imports: [CatsModule, ConfigModule.register({ folder: './config' })],
})
export class AppModule {}
