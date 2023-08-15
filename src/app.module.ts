import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './commons/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShowsModule } from './shows/shows.module';
import { SeatsModule } from './seats/seats.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserReservationModule } from './user-reservation/user-reservation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot(),
    UsersModule,
    ShowsModule,
    SeatsModule,
    ReservationModule,
    UserReservationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // LoggerMiddleware 추가
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
