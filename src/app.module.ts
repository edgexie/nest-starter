import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

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
  ],
  imports: [CatsModule],
})
export class AppModule {}
