import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ReservationRepository extends Repository<ReservationEntity> {
  constructor(private datasource: DataSource) {
    super(ReservationEntity, datasource.createEntityManager());
  }

  async getMyReservations(userId) {
    try {
      const myReservations = await this.createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.show', 'show')
        .leftJoinAndSelect('reservation.seat', 'seat')
        .select([
          'reservation.id',
          'show.id',
          'show.title',
          'show.category',
          'show.date',
          'seat.seatNumber',
          'seat.grade',
          'seat.price',
        ])
        .where('reservation.userId = :userId', { userId })
        .getMany();

      if (!myReservations || myReservations.length < 1) {
        throw new HttpException(CustomHttpException['NOTFOUNDED_EXCEPTION'], HttpStatus.NOT_FOUND);
      }

      return myReservations;
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMyReservationById(userId, reservationId) {
    try {
      const myReservation = await this.createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.show', 'show')
        .leftJoinAndSelect('reservation.seat', 'seat')
        .select([
          'reservation.id',
          'reservation.userId',
          'show.id',
          'show.title',
          'show.category',
          'show.date',
          'seat.seatNumber',
          'seat.grade',
          'seat.price',
        ])
        .where('reservation.id = :reservationId', { reservationId })
        .getOne();

      return myReservation;
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getByIsReservedSeat(showId, seatId) {
    try {
      const isReservedSeat = await this.find({ where: { showId, seatId } });
      return isReservedSeat.length > 0 ? true : false;
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createReservation(userId, showId, seatId) {
    try {
      const createdReservation = await this.createQueryBuilder()
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
