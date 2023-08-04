import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
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

  async getByShowIdAndSeatId(showId, seatId): Promise<any> {
    try {
      const seat = await this.seatEntity
        .createQueryBuilder('seat')
        .leftJoinAndSelect('seat.reservation', 'reservation')
        .select(['seat.id', 'seat.price', 'seat.grade', 'seat.seatNumber', 'reservation'])
        .where('seat.id = :seatId', { seatId })
        .getOne();

      return seat;
    } catch (error) {
      console.log(error);
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
