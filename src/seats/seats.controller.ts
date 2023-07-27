import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('seats')
@Controller('api/shows/:showId/seats')
export class SeatsController {
  @ApiOperation({ summary: '예매가능 좌석 조회' })
  @ApiParam({
    name: 'showId',
    required: true,
    description: '공연 id',
  })
  @Get()
  getSeats() {}
}
