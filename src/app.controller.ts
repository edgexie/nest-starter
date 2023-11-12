import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  UploadedFiles,
  UseInterceptors,
  Inject,
  Req,
  Header,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Request } from 'express';
class PersonInfoDto {
  name: string;
  age: number;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject('person') private readonly person: { name: string };

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  // query,注意query应该放在 url param 前，否则先匹配url param
  @Get('find')
  query(@Query('name') name: string, @Req() request: Request) {
    console.log(request);
    return 'your name is' + name;
  }

  // url param
  // 注意'api/person'会和'id'拼在一起
  // @Get(':id')
  // getHello2(@Param('id') id: string): string {
  //   return this.appService.getHello(id);
  // }

  // form-urlencoded，JSON，DTO data transfer object 就是用于封装传输的数据的对象
  @Post()
  body(@Body() personInfoDto: PersonInfoDto) {
    return 'your info is ' + JSON.stringify(personInfoDto);
  }

  // form-data，必须使用拦截器解析 AnyFilesInterceptor
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() personInfoDto: PersonInfoDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(personInfoDto)}`;
  }
}
