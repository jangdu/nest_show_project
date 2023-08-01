import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { ReservationRepository } from 'src/reservation/reservation.repository';

@Injectable()
export class UserReservationService {
  constructor(private reservationRepository: ReservationRepository) {}

  async getMyReservations(userId) {
    const myReservations = await this.reservationRepository.getMyReservations(userId);

    return myReservations;
  }

  async getMyReservationById(userId, reservationId) {
    const myReservation = await this.reservationRepository.getMyReservationById(userId, reservationId);

    if (!myReservation) {
      throw new HttpException(CustomHttpException['NOTFOUNDED_EXCEPTION'], HttpStatus.NOT_FOUND);
    }

    if (myReservation.userId !== userId) {
      throw new HttpException(CustomHttpException['UNAUTHORIZED_EXCEPTION'], HttpStatus.FORBIDDEN);
    }

    return myReservation;
  }
}
