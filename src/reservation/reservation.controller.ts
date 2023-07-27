import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Param, Post } from '@nestjs/common';

@ApiTags('reservation')
@Controller('api/shows/:showId/seats/:seatId/reservations')
export class ReservationController {
  @ApiOperation({ summary: '공연 예매 하기' })
  @ApiParam({
    name: 'showId',
    required: true,
    description: '예매 할 공연 id',
  })
  @ApiParam({
    name: 'seatId',
    required: true,
    description: '예매 할 좌석 id',
  })
  @Post()
  createReservation(@Param('showId') showId: string, @Param('seatId') seatId: string) {}
}
