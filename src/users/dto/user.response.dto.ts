import { ApiProperty, PickType } from '@nestjs/swagger';
import { CustomHttpSuccess } from 'src/commons/constants/http-success.constants';
import { UserEntity } from 'src/entities/user.entity';

export class AccessTokenDto {
  @ApiProperty({
    example: 'bearerToken',
  })
  readonly accessToken: string;
}

export class SignupResponseDto {
  @ApiProperty({
    example: 201,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess.SIGNUP_SUCCESS,
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: AccessTokenDto,
  })
  readonly data: object;
}

export class SigninResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess.SIGNIN_SUCCESS,
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: AccessTokenDto,
  })
  readonly data: object;
}

export class MyUserDto extends PickType(UserEntity, ['id', 'email', 'name', 'isAdmin', 'id', 'point', 'createdAt']) {}

export class MeResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess.GET_MY_INFO_SUCCESS,
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: MyUserDto,
  })
  readonly data: object;
}
