import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ShowEntity } from 'src/entities/show.entity';
import { SeatEntity } from 'src/entities/seat.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const showRepository = dataSource.getRepository(ShowEntity);
    await showRepository.insert([
      {
        id: 1,
        title: '장두혁의 node.js',
        date: '2023-08-01 14:00:00',
        location: '강남 공연장',
        category: '뮤지컬',
      },
    ]);
    const seatRepository = dataSource.getRepository(SeatEntity);

    for (let i = 1; i < 101; i++) {
      await seatRepository.insert([
        {
          id: i,
          grade: 'B',
          price: 8000,
          seatNumber: i,
          showId: 1,
        },
      ]);
    }
    for (let i = 101; i < 151; i++) {
      await seatRepository.insert([
        {
          id: i,
          grade: 'A',
          price: 10000,
          seatNumber: i,
          showId: 1,
        },
      ]);
    }
    for (let i = 151; i < 200; i++) {
      await seatRepository.insert([
        {
          id: i,
          grade: 'S',
          price: 20000,
          seatNumber: i,
          showId: 1,
        },
      ]);
    }
  }
}
