import { catchError, map, tap } from 'rxjs/operators';
import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
      // 改变响应的值
      map((value) => (value === null ? '' : value)),
      // 覆盖抛出的异常
      catchError((err) => throwError(() => new BadGatewayException())),
    );
  }
}
