import { PickType } from '@nestjs/swagger';
import { SeatEntity } from 'src/entities/seat.entity';

export class seatDto extends PickType(SeatEntity, ['seatNumber', 'grade', 'price']) {}
