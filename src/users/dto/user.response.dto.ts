import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';

export class AccessTokenDto {
  readonly accessToken: string;
}

export class SignupResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

export class SigninResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

export class MyUserDto extends PickType(UserEntity, ['email', 'name', 'isAdmin', 'id', 'point', 'createdAt']) {}

export class MeResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}
