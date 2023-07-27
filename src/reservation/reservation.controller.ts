import { Controller, Post } from '@nestjs/common';

@Controller('api/shows/:showId/seats/:seatId/reservations')
export class ReservationController {
  @Post()
  createReservation() {}
}
