import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
  @ApiProperty({
    example: 'true',
    description: 'admin 계정 유무',
    required: true,
  })
  public isAdmin: boolean;

  @ApiProperty({
    example: '장두혁',
    description: '계정 이름',
    required: true,
  })
  public name: string;

  @ApiProperty({
    example: 'jjj@gmail.com',
    description: '계정 이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'a12345',
    description: '계정 비밀번호',
    required: true,
  })
  public password: string;

  @ApiProperty({
    example: 'a12345',
    description: '계정 비밀번호 확인',
    required: true,
  })
  public confirm: string;
}
