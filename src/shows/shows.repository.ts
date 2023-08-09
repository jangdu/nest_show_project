import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { DataSource, Repository } from 'typeorm';
import { CreateShowRequestDto } from './dto/shows.request.dto';
import { ShowEntity } from 'src/entities/show.entity';

@Injectable()
export class ShowsRepository extends Repository<ShowEntity> {
  constructor(private datasource: DataSource) {
    super(ShowEntity, datasource.createEntityManager());
  }

  // 회원 등록
  async createShows(newShow: CreateShowRequestDto): Promise<number> {
    try {
      const { title, location, category, date } = newShow;

      const createdShow = await this.insert({
        title,
        location,
        category,
        date,
      });
      return createdShow.identifiers[0].id;
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByKeyword(keyword: string | null): Promise<any> {
    try {
      const show = await this.createQueryBuilder('show')
        .where('show.title LIKE :keyword OR show.category LIKE :keyword', {
          // .where('show.title LIKE :keyword OR show.category LIKE :keyword', {
          keyword: `%${keyword}%`,
        })
        .getMany();

      return { show };
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number) {
    try {
      const show = await this.createQueryBuilder('show')
        .leftJoinAndSelect('show.seat', 'seat')
        .leftJoinAndSelect('seat.reservation', 'reservation')
        .select([
          'show.id',
          'show.title',
          'show.category',
          'show.date',
          'seat.seatNumber',
          'seat.grade',
          'seat.price',
          'reservation',
        ])
        .where('show.id = :id', { id })
        .getOne();

      if (!show) {
        throw new HttpException(CustomHttpException['NOTFOUNDED_EXCEPTION'], HttpStatus.NOT_FOUND);
      }

      //   const availableSeatCount = show ? show.seat : 0;
      const availableSeatCount = show.seat.filter((item) => {
        return item.reservation.length < 1;
      }).length;
      // availableSeatCount;

      return { show, availableSeatCount };
    } catch (error) {
      if (error.status === 404)
        throw new HttpException(CustomHttpException['NOTFOUNDED_EXCEPTION'], HttpStatus.NOT_FOUND);

      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
