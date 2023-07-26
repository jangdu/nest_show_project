import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './commons/middlewares/logger.middleware';

@Module({
  imports: [],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  // LoggerMiddleware 추가
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
