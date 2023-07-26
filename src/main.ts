import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/exceptions/httpException.filter';

// HMR 활성화
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  // httpExceptionfilter활성화 예외처리 전역 필터 설정
  app.useGlobalFilters(new HttpExceptionFilter());
  // cors 설정
  app.enableCors();

  await app.listen(port);
  console.log(`listening on port ${port}`);
  console.log(process.env.NODE_ENV);

  // Hot Reload 활성화
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
