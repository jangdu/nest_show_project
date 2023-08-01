import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { ReservationRepository } from './reservation.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ReservationService {
  constructor(private reservationRepository: ReservationRepository) {}
  async createReservation(userId, showId, seatId) {
    const isReservedSeat = await this.reservationRepository.getByIsReservedSeat(showId, seatId);

    if (isReservedSeat) throw new HttpException(CustomHttpException['CONFLICT_SEAT'], HttpStatus.CONFLICT);

    const createdReservation = await this.reservationRepository.createReservation(userId, showId, seatId);

    return createdReservation;
  }
}
