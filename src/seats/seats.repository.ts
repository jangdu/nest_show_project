import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { SeatEntity } from 'src/entities/seat.entity';
import { CreateShowRequestDto } from 'src/shows/dto/shows.request.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SeatsRepository extends Repository<SeatEntity> {
  constructor(private datasource: DataSource) {
    super(SeatEntity, datasource.createEntityManager());
  }

  async createSeats(seatNumber, grade, price, createdShowId): Promise<any> {
    try {
      const createdSeat = await this.insert({
        showId: createdShowId,
        seatNumber,
        grade,
        price,
      });
    } catch (error) {}
  }

  async getByShowIdAndSeatId(showId, seatId): Promise<any> {
    try {
      const seat = await this.createQueryBuilder('seat')
        .leftJoinAndSelect('seat.reservation', 'reservation')
        .select(['seat.id', 'seat.price', 'seat.grade', 'seat.seatNumber', 'reservation'])
        .where('seat.id = :seatId', { seatId })
        .getOne();

      return seat;
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
