import { Module } from '@nestjs/common';
import { UserReservationController } from './user-reservation.controller';
import { UserReservationService } from './user-reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowEntity } from 'src/entities/show.entity';
import { UserEntity } from 'src/entities/user.entity';
import { SeatEntity } from 'src/entities/seat.entity';
import { JwtStrategy } from 'src/commons/auth/jwt.strategy';
import { ReservationRepository } from 'src/reservation/reservation.repository';
import { UsersRepository } from 'src/users/users.repository';
import { ReservationEntity } from 'src/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShowEntity, UserEntity, SeatEntity, ReservationEntity])],
  controllers: [UserReservationController],
  providers: [UserReservationService, JwtStrategy, UsersRepository, ReservationRepository],
})
export class UserReservationModule {}
