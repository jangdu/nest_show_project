import { ApiProperty } from '@nestjs/swagger';
import { CustomHttpSuccess } from '../constants/http-success.constants';

export class BaseResponseDto {
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
}
