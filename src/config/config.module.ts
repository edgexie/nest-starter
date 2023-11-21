import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

// 动态模块
@Module({})
export class ConfigModule {
  static register(options: object): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        ConfigService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [ConfigService],
    };
  }
}
