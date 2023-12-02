import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { PageDto } from './page.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUser(@Query() pageDto: PageDto) {
    const [users, count] = await this.userService.findAll(pageDto);
    return {
      data: users,
      total: count,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.userService.findOne(id);
    return res;
  }

  @Put(':id/:name')
  async updateOne(@Param('id') id: string, @Param('name') name: string) {
    const res = await this.userService.updateOne({ id, name });
    return res;
  }
}
