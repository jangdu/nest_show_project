import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateShowRequestDto } from './dto/shows.request.dto';
import { CreateShowResponseDto } from './dto/shows.response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/commons/decorators/token.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { CustomHttpSuccess } from 'src/commons/constants/http-success.constants';
import { ShowsService } from './shows.service';

@ApiTags('shows')
@Controller('api/shows')
export class ShowsController {
  constructor(private showsService: ShowsService) {}

  //   @ApiOperation({ summary: '공연 내역 전체 조회' })
  //   @Get()
  //   getShows() {}

  @ApiOperation({ summary: '공연 검색 내역 조회' })
  @ApiQuery({
    name: 'keyword',
    required: true,
    description: '공연 검색 키워드',
  })
  @Get()
  getShowByKeyword(@Query() query) {}

  @ApiOperation({ summary: '공연 상세 조회' })
  @ApiParam({ name: 'showId', description: '공연 id', required: true })
  @Get(':showId')
  getShowById(@Param() param) {
    console.log(param.id);
  }

  @ApiResponse({
    type: CreateShowRequestDto,
    status: 201,
    description: '공연 생성 성공',
  })
  @ApiOperation({ summary: '공연 생성' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createShow(@Token() user: UserEntity, @Body() body: CreateShowRequestDto): Promise<CreateShowResponseDto> {
    console.log(user);
    const createdShow = await this.showsService.createShow(body);

    return {
      statusCode: 201,
      message: CustomHttpSuccess['CREATE_SHOW'],
      data: createdShow,
    };
  }
}
