import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('user-reservation')
@Controller('api/reservations')
export class UserReservationController {
  @ApiOperation({ summary: '내 예매내역 조회' })
  @Get()
  getUserReservations() {}

  @ApiOperation({ summary: '내 예매내역 상세 조회' })
  @ApiParam({
    name: 'reservationId',
    required: true,
    description: '예매 티켓 id',
  })
  @Get('/:reservationId')
  getUserReservationsById() {}
}
