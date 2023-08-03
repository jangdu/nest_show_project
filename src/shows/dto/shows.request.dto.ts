import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { SeatEntity } from 'src/entities/seat.entity';
import { ShowEntity } from 'src/entities/show.entity';

class SeatInfo extends PickType(SeatEntity, ['grade', 'price']) {
  @IsNumber()
  @ApiProperty({ example: 50, description: '해당 좌석 갯수', required: true })
  numberOfSeat: number;
}

export class GetShowRequestDto {
  keyword: string;
}

export class CreateShowRequestDto extends PickType(ShowEntity, ['title', 'location', 'category', 'date']) {
  @ValidateNested({ each: true })
  @Type(() => SeatInfo)
  @ApiProperty({
    example: [
      {
        numberOfSeat: 20,
        grade: 'S',
        price: 30000,
      },
      {
        numberOfSeat: 30,
        grade: 'A',
        price: 20000,
      },
      {
        numberOfSeat: 50,
        grade: 'B',
        price: 10000,
      },
    ],
  })
  seatInfos: SeatInfo[];
}
