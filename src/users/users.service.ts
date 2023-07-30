import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/user.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUsers(
    email: string,
    name: string,
    isAdmin: boolean,
    password: string,
    confirm: string,
  ): Promise<AccessTokenDto> {
    if (password !== confirm) {
      throw new HttpException(CustomHttpException['BAD_REQUEST_PASSWORD'], HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      // 이미 존재하는 이메일 에러
      throw new HttpException(CustomHttpException['CONFLICT_EMAIL'], HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.usersRepository.save({
      email,
      name,
      isAdmin,
      password: hashedPassword,
      point: 100000,
    });

    const payload = { email };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken: accessToken };
  }
}
