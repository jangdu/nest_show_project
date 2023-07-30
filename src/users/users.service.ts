import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/user.response.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository, private jwtService: JwtService) {}

  async signup(body): Promise<AccessTokenDto> {
    const { email, name, isAdmin, password, confirm } = body;
    if (password !== confirm) {
      throw new HttpException(CustomHttpException['BAD_REQUEST_PASSWORD'], HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.usersRepository.findByEmail(email);

    if (user) {
      // 이미 존재하는 이메일 에러
      throw new HttpException(CustomHttpException['CONFLICT_EMAIL'], HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.usersRepository.createUser(email, name, isAdmin, hashedPassword, 100000);

    const payload = { email };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken: accessToken };
  }
}
