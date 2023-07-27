import { Module } from '@nestjs/common';
import { UserReservationController } from './user-reservation.controller';
import { UserReservationService } from './user-reservation.service';

@Module({
  controllers: [UserReservationController],
  providers: [UserReservationService]
})
export class UserReservationModule {}
