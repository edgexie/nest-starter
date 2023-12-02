import { Module, Provider, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { HttpExceptionFilter } from './http-exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'edgexie',
      database: 'nestjs',
      connectorPackage: 'mysql2',
      autoLoadEntities: true, // 自动加载实体,指定该选项后，通过 forFeature() 方法注册的每个实体都将自动添加到配置对象的 entities 数组中。
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
  ],
})
export class AppModule {
  constructor() {
    console.log('Current environment:', process.env.NODE_ENV);
  }
}
