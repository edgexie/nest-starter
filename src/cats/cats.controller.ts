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
  OnModuleInit,
  UseFilters,
} from '@nestjs/common';

import { CatsService } from './cats.service';
import {
  CreateCatDto,
  createCatSchema,
  CreateCatUseClassValidatorDto,
} from './dto/create-cat.dto';

import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Request, Response } from 'express';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { ClassValidationPipe } from '../pipes/class-validation.pipe';

import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { ModuleRef } from '@nestjs/core';
import { Create2CatDto } from './dto/create2-cat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController implements OnModuleInit {
  private helloMessage: string;
  private service: CatsService;
  constructor(
    private readonly catsService: CatsService, // @Inject('ASYNC_CONNECTION') private readonly connection: any,
    private moduleRef: ModuleRef,
  ) {
    // this.helloMessage = configService.get('HELLO_MESSAGE');
  }

  onModuleInit() {
    this.service = this.moduleRef.get(CatsService);
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

  @Post('create-with-mongodb')
  createWithMongoose(@Body() create2CatDto: Create2CatDto) {
    this.catsService.createWithMongoose(create2CatDto);
  }

  // 使用express 获取 post form-urlencoded的参数，以及返回查询成功后的结果
  @Post('express')
  create3(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ ...req.body, bar: 234 });
  }

  @Get()
  @Roles(['admin'])
  // 方法名称没有任何意义
  findAll(@Req() request: Request): any {
    // console.log(this.config);
    const res = { a: null };
    return res;
  }

  @Get('cats-in-mongoose')
  getCatsInMongoose() {
    return this.catsService.getCatsInMongoose();
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
