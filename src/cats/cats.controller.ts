import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Res,
  HttpStatus,
  ParseIntPipe,
  DefaultValuePipe,
  UsePipes,
  UseGuards,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import {
  CreateCatDto,
  createCatSchema,
  CreateCatUseClassValidatorDto,
} from './dto/create-cat.dto';

import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Request, Response } from 'express';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { ClassValidationPipe } from 'src/pipes/class-validation.pipe';

import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  private helloMessage: string;
  constructor(
    private readonly catsService: CatsService, // @Inject('ASYNC_CONNECTION') private readonly connection: any,
  ) {
    // this.helloMessage = configService.get('HELLO_MESSAGE');
  }
  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Post('create-use-class-validator')
  create2(
    @Body(ClassValidationPipe)
    createCatUseClassValidatorDto: CreateCatUseClassValidatorDto,
  ) {
    return this.catsService.create2(createCatUseClassValidatorDto);
  }

  // 使用express 获取 post form-urlencoded的参数，以及返回查询成功后的结果
  @Post('express')
  create3(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ ...req.body, bar: 234 });
  }

  @Get()
  @Roles('admin')
  // 方法名称没有任何意义
  findAll(@Req() request: Request): any {
    // console.log(this.config);
    const res = { a: null };
    return res;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
