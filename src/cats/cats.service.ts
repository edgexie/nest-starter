import { Injectable } from '@nestjs/common';
import {
  CreateCatDto,
  CreateCatUseClassValidatorDto,
} from './dto/create-cat.dto';

import { Create2CatDto } from './dto/create2-cat.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async createWithMongoose(create2CatDto: Create2CatDto) {
    const createdCat = new this.catModel(create2CatDto);
    return createdCat.save();
  }

  async getCatsInMongoose() {
    return this.catModel.find().exec();
  }
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
