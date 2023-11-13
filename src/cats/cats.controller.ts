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

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

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
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
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
