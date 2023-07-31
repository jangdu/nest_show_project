import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { Repository } from 'typeorm';
import { CreateShowRequestDto } from './dto/shows.request.dto';
import { ShowEntity } from 'src/entities/show.entity';

@Injectable()
export class ShowsRepository {
  constructor(@InjectRepository(ShowEntity) private showEntity: Repository<ShowEntity>) {}

  // 회원 등록
  async createShows(newShow: CreateShowRequestDto): Promise<number> {
    try {
      const { title, location, category, date } = newShow;

      const createdShow = await this.showEntity.insert({
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
}
