import { Controller, Get } from '@nestjs/common';

@Controller('api/reservations')
export class UserReservationController {
  @Get()
  getUserReservations() {}

  @Get('/:reservationId')
  getUserReservationsById() {}
}
