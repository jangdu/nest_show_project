import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatEntity } from 'src/entities/seat.entity';
import { CreateShowRequestDto } from 'src/shows/dto/shows.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SeatsRepository {
  constructor(@InjectRepository(SeatEntity) private seatEntity: Repository<SeatEntity>) {}

  async createSeats(seatNumber, grade, price, createdShowId): Promise<any> {
    try {
      const createdSeat = await this.seatEntity.insert({
        showId: createdShowId,
        seatNumber,
        grade,
        price,
      });
    } catch (error) {}
  }
}
