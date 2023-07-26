import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response, response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(`${method} ${originalUrl} : ${statusCode} ${contentLength}`);
    });
    next();
  }
}
