import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(UserEntity) private userEntity: Repository<UserEntity>) {}

  // email로 회원 검색
  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userEntity.findOne({
        where: { email },
      });

      return user;
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 회원 등록
  async createUser(email: string, name: string, isAdmin: boolean, password: string, point: number): Promise<void> {
    try {
      await this.userEntity.insert({
        email,
        name,
        isAdmin,
        password,
        point,
      });
    } catch (error) {
      throw new HttpException(CustomHttpException['DB_SERVER_ERROR'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
