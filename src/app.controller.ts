import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
class PersonInfoDto {
  name: string;
  age: number;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  getHello2(@Param('id') id: string): string {
    return this.appService.getHello(id);
  }

  @Get('find')
  query(@Query('name') name: string) {
    return 'your name is' + name;
  }

  @Post()
  body(@Body() personInfoDto: PersonInfoDto) {
    return 'your info is ' + JSON.stringify(personInfoDto);
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() personInfoDto: PersonInfoDto,
    // @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // console.log(files);
    return `received: ${JSON.stringify(personInfoDto)}`;
  }
}
