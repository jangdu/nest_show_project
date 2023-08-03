import { ApiProperty, PickType } from '@nestjs/swagger';
import { CustomHttpSuccess } from 'src/commons/constants/http-success.constants';
import { ShowEntity } from 'src/entities/show.entity';

export class ShowDto extends PickType(ShowEntity, ['id', 'title', 'category', 'date']) {}

export class CreateShowResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess.CREATE_SHOW,
    description: '메시지',
  })
  readonly message: string;

  // @ApiProperty({
  //   type: ShowDto,
  // })
  // readonly data: object;
}

export class GetShowsResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess.GET_SHOW_BY_KEYWORD,
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: [ShowDto],
  })
  readonly data: [object];
}

export class GetShowByIdDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess.GET_SHOW_BY_ID,
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: [ShowDto],
  })
  readonly data: object;
}
