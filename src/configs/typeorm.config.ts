// import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { SeatEntity } from 'src/entities/seat.entity';
import { ShowEntity } from 'src/entities/show.entity';
import { UserEntity } from 'src/entities/user.entity';
dotenv.config();

const entities = [UserEntity, ReservationEntity, SeatEntity, ShowEntity];
export let typeORMConfig: TypeOrmModuleOptions;
typeORMConfig = {
  type: 'mysql',
  host: process.env.DEV_DB_HOST,
  port: 3306,
  username: process.env.DEV_DB_USERNAME,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE,
  entities: entities,
  // 자동으로 엔티티로드할지
  autoLoadEntities: false,
  // 앱 시작 시 스키마 자동 동기화
  synchronize: false,
  // 로깅
  logging: true,
  // 앱 종료후에도 연결 유지
  keepConnectionAlive: true,
  // 한국 표준 시
  timezone: '+09.00',
};

// todo: class로
// const entities = [];

// @Injectable()
// export class TypeOrmConfig implements TypeOrmOptionsFactory {
//   createTypeOrmOptions(): TypeOrmModuleOptions {
//     return {
//       type: 'mysql',
//       host: process.env.DEV_DB_HOST,
//       port: parseInt(process.env.DEV_DB_PORT),
//       username: process.env.DEV_DB_USERNAME,
//       password: process.env.DEV_DB_PASSWORD,
//       database: process.env.DEV_DB_DATABASE,
//       entities: entities,
//       // 자동으로 엔티티로드할지
//       autoLoadEntities: true,
//       // 앱 시작 시 스키마 자동 동기화
//       synchronize: true,
//       // 로깅
//       logging: true,
//       // 앱 종료후에도 연결 유지
//       keepConnectionAlive: true,
//       // 한국 표준 시
//       timezone: '+09.00',
//     };
//   }
// }
