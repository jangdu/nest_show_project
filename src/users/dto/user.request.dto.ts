import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';

// picktype: entity에 있는거 가져오깃
export class SignupRequestDto extends PickType(UserEntity, ['email', 'name', 'isAdmin', 'password']) {
  @IsString()
  @ApiProperty({
    example: 'a12345',
    description: '계정 비밀번호 확인',
    required: true,
  })
  public confirm: string;
}
