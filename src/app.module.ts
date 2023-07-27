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

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ShowsModule, SeatsModule, ReservationModule, UserReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // LoggerMiddleware 추가
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
