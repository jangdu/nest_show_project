import { UserReservationService } from './user-reservation.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CustomHttpSuccess } from 'src/commons/constants/http-success.constants';
import { Token } from 'src/commons/decorators/token.decorator';
import { UserEntity } from 'src/entities/user.entity';

@ApiTags('user-reservation')
@UseGuards(AuthGuard('jwt'))
@Controller('api/myReservations')
export class UserReservationController {
  constructor(private userReservationService: UserReservationService) {}
  @ApiOperation({ summary: '내 예매내역 조회' })
  @Get()
  async getUserReservations(@Token() user: UserEntity) {
    console.log(user);
    const myReservations = await this.userReservationService.getMyReservations(user.id);

    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_RESERVATION'],
      data: myReservations,
    };
  }

  @ApiOperation({ summary: '내 예매내역 상세 조회' })
  @ApiParam({
    name: 'reservationId',
    required: true,
    description: '예매 티켓 id',
  })
  @Get('/:reservationId')
  async getUserReservationsById(@Token() user: UserEntity, @Param('reservationId') reservationId: string) {
    const myReservation = await this.userReservationService.getMyReservationById(user.id, reservationId);

    return {
      statusCode: 201,
      message: CustomHttpSuccess['GET_RESERVATION_BY_ID'],
      data: myReservation,
    };
  }
}
