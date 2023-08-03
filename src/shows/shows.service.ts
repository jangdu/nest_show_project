import { SeatsRepository } from './../seats/seats.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShowRequestDto } from './dto/shows.request.dto';
import { ShowsRepository } from './shows.repository';
import { DataSource } from 'typeorm';
import { ShowEntity } from 'src/entities/show.entity';
import { SeatEntity } from 'src/entities/seat.entity';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { promises } from 'dns';

@Injectable()
export class ShowsService {
  constructor(
    private showsRepository: ShowsRepository,
    private seatsRepository: SeatsRepository,
    // @InjectRepository(ShowEntity) private showEntity: Repository<ShowEntity>,
    // @InjectRepository(SeatEntity) private seatEntity: Repository<SeatEntity>,
    private dataSource: DataSource,
  ) {}

  async createShow(newShow: CreateShowRequestDto): Promise<any> {
    const { title, location, category, date } = newShow;
    const { seatInfos } = newShow;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createdShow = await queryRunner.manager.getRepository(ShowEntity).insert({
        title,
        location,
        category,
        date,
      });

      for (const seatInfo of seatInfos) {
        if (seatInfo.numberOfSeat <= 0) {
          throw new Error('numberOfSeat must be greater than 0.');
        }

        for (let i = 1; i <= seatInfo.numberOfSeat; i++) {
          const createdSeat = await queryRunner.manager.getRepository(SeatEntity).insert({
            // showId: 2, // 임의로 잘못된 showId를 사용
            showId: createdShow.identifiers[0].id,
            seatNumber: i,
            grade: seatInfo.grade,
            price: seatInfo.price,
          });
        }
      }

      await queryRunner.commitTransaction();

      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: number) {
    return this.showsRepository.findById(id);
  }

  async findByKeyword(keyowrd: string | null): Promise<any> {
    return this.showsRepository.findByKeyword(keyowrd);
  }
}
