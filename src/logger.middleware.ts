import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
// 创建中间件类，实现NestMiddleware接口
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
}
