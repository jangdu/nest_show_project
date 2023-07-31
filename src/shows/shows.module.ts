import { JwtStrategy } from './../commons/auth/jwt.strategy';
import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowEntity } from 'src/entities/show.entity';
import { ShowsRepository } from './shows.repository';
import { UsersRepository } from 'src/users/users.repository';
import { UserEntity } from 'src/entities/user.entity';
import { SeatEntity } from 'src/entities/seat.entity';
import { SeatsRepository } from 'src/seats/seats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShowEntity, UserEntity, SeatEntity])],
  providers: [JwtStrategy, ShowsService, ShowsRepository, SeatsRepository, UsersRepository],
  controllers: [ShowsController],
})
export class ShowsModule {}
