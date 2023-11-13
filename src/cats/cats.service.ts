import { Injectable } from '@nestjs/common';
import {
  CreateCatDto,
  CreateCatUseClassValidatorDto,
} from './dto/create-cat.dto';

@Injectable()
export class CatsService {
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
