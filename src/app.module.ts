import { Module, Provider, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule } from './config/config.module';
import { HttpExceptionFilter } from './http-exception.filter';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Users } from './user/users.entity';

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
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
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
  imports: [
    CatsModule,
    ConfigModule.register({ folder: './config' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'edgexie',
      database: 'nestjs',
      entities: [Users],
      // synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
