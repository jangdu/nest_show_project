import { Controller, Get } from '@nestjs/common';

@Controller('api/shows/:showId/seats')
export class SeatsController {
  @Get()
  getSeats() {}
}
