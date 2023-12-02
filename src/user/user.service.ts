import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { PageDto } from './page.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(pageDto: PageDto): Promise<[User[], number]> {
    if (pageDto.pageNum !== undefined && pageDto.pageSize !== undefined) {
      return this.findWithPagination(pageDto);
    } else {
      return this.findWithoutPagination();
    }
  }
  // 有分页条件的查询
  async findWithPagination(pageDto): Promise<[User[], number]> {
    const [users, count] = await this.userRepository.findAndCount({
      skip: (pageDto.pageNum - 1) * pageDto.pageSize,
      take: pageDto.pageSize,
    });
    return [users, count];
  }
  // 没有分页条件的查询
  async findWithoutPagination(): Promise<[User[], number]> {
    const [users, count] = await this.userRepository.findAndCount();
    return [users, count];
  }

  // 根据id查询
  async findOne(id) {
    const res = await this.userRepository.findOne({
      where: { id },
      relations: { photos: true },
    });
    return res;
  }

  // 更新
  async updateOne({ id, name }) {
    const userToUpdate = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    userToUpdate.name = name;
    this.userRepository.save(userToUpdate);
    return userToUpdate;
  }

  // findAndCountBy({pageNum, pageSize}){
  //   return this.userRepository.({ });
  // }
}
