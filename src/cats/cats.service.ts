import { Injectable } from '@nestjs/common';
import { ConfigService } from './../config/config.service';
import {
  CreateCatDto,
  CreateCatUseClassValidatorDto,
} from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(private configService: ConfigService) {}
  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat123';
  }
  create2(createCatUseClassValidatorDto: CreateCatUseClassValidatorDto) {
    return 'This action adds a new cat123';
  }

  findAll() {
    return `This action returns all cats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
