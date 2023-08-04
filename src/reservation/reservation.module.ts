import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { UserEntity } from 'src/entities/user.entity';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationRepository } from './reservation.repository';
import { SeatsRepository } from 'src/seats/seats.repository';
import { SeatEntity } from 'src/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SeatEntity, ReservationEntity])],
  controllers: [ReservationController],
  providers: [ReservationService, SeatsRepository, ReservationRepository],
})
export class ReservationModule {}
