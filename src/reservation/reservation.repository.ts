import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationRepository {
  constructor(@InjectRepository(ReservationEntity) private reservationEntity: Repository<ReservationEntity>) {}

  async getByIsReservedSeat(showId, seatId) {
    try {
      const isReservedSeat = await this.reservationEntity.find({ where: { showId, seatId } });
      return isReservedSeat.length > 0 ? true : false;
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createReservation(userId, showId, seatId) {
    try {
      const createdReservation = await this.reservationEntity
        .createQueryBuilder()
        .insert()
        .into(ReservationEntity)
        .values({ userId, showId, seatId })
        .execute();

      //   const createdReservation = await this.reservationEntity.insert({
      //     userId,
      //     showId,
      //     seatId,
      //   });
      return { reservationId: createdReservation.raw.insertId };
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
