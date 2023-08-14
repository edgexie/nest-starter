import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello<T>(id?: T): string {
    if (id) {
      return 'H1' + id;
    }
    return 'HI';
  }
}
