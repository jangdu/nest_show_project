import { ApiProperty } from '@nestjs/swagger';
import { SignupRequestDto } from 'src/users/dto/user.request.dto';

export class UserDto extends SignupRequestDto {
  @ApiProperty({
    example: '1',
    description: 'admin 계정 유무',
    required: true,
  })
  public id: number;

  @ApiProperty({
    example: '100000',
    description: '계정 포인트',
    required: true,
  })
  public point: number;
}
