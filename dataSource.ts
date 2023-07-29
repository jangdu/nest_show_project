import * as dotenv from 'dotenv';
import { UserEntity } from 'src/entities/user.entity';
import { ShowEntity } from 'src/entities/show.entity';
import { SeatEntity } from 'src/entities/seat.entity';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { DataSource } from 'typeorm';
dotenv.config();

const entities = [UserEntity, SeatEntity, ShowEntity, ReservationEntity];

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DEV_DB_HOST,
  port: 3306,
  username: process.env.DEV_DB_USERNAME,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE,
  entities: entities,
  // 앱 시작 시 스키마 자동 동기화
  synchronize: false,
  // 로깅
  logging: true,
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8m4_general_ci',
  // 한국 표준 시
  timezone: '+09.00',
});
export default dataSource;
