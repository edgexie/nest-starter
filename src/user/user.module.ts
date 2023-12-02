import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Photo } from './photo.entity';
import { UserSubscriber } from './user.subscriber';
@Module({
  imports: [TypeOrmModule.forFeature([User, Photo])],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
})
export class UserModule {}
