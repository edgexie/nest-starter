import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';

import { Request, Response } from 'express';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  // 使用express 获取 post form-urlencoded的参数，以及返回查询成功后的结果
  @Post('express')
  create2(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ ...req.body, bar: 234 });
  }

  @Get()
  // 方法名称没有任何意义
  findAll(@Req() request: Request): string {
    console.log(request.query.id);

    return 'This action returns all cats';
    return this.catsService.findAll();
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
