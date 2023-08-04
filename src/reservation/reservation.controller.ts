import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CustomHttpSuccess } from 'src/commons/constants/http-success.constants';
import { ReservationService } from './reservation.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';
import { Token } from 'src/commons/decorators/token.decorator';

@ApiTags('reservation')
@Controller('api/shows/:showId/seats/:seatId/reservations')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

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
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createReservation(@Token() user: UserEntity, @Param('showId') showId: string, @Param('seatId') seatId: string) {
    console.log(user.id, showId, seatId);

    const reservatedShow = await this.reservationService.createReservation(user, showId, seatId);

    return {
      statusCode: 201,
      message: CustomHttpSuccess['CREATE_RESERVATION'],
      data: reservatedShow,
    };
  }
}
