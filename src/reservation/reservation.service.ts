import { DataSource } from 'typeorm';
import { ShowsRepository } from './../shows/shows.repository';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { ReservationRepository } from './reservation.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SeatsRepository } from 'src/seats/seats.repository';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    private reservationRepository: ReservationRepository,
    private seatsRepository: SeatsRepository,
    private dataSource: DataSource,
  ) {}
  async createReservation(user, showId, seatId) {
    const seat = await this.seatsRepository.getByShowIdAndSeatId(showId, seatId);

    if (!seat) throw new HttpException(CustomHttpException.NOTFOUNDED_EXCEPTION, HttpStatus.NOT_FOUND);

    if (seat.reservation.length > 0) throw new HttpException(CustomHttpException['CONFLICT_SEAT'], HttpStatus.CONFLICT);

    if (seat.price > user.point)
      throw new HttpException(
        CustomHttpException['NOT_ENOUGH_POINTS'],
        CustomHttpException.NOT_ENOUGH_POINTS.statusCode,
      );

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdReservation = await queryRunner.manager.getRepository(ReservationEntity).insert({
        userId: user.id,
        showId,
        seatId,
      });

      user.point -= seat.price;
      await queryRunner.manager.getRepository(UserEntity).save(user);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
