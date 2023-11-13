import { IsString, IsInt } from 'class-validator';

export class Create2CatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
