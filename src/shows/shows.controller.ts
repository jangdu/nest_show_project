import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateShowRequestDto } from './dto/shows.request.dto';
import { CreateShowResponseDto } from './dto/shows.response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/commons/decorators/token.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { CustomHttpSuccess } from 'src/commons/constants/http-success.constants';
import { ShowsService } from './shows.service';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';

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
  async getShowByKeyword(@Query() query) {
    const { keyword } = query;
    const shows = await this.showsService.findByKeyword(keyword ? keyword : '');

    return {
      statusCode: 201,
      message: CustomHttpSuccess['GET_SHOW_BY_KEYWORD'],
      data: shows,
    };
  }

  @ApiOperation({ summary: '공연 상세 조회' })
  @ApiParam({ name: 'showId', description: '공연 id', required: true })
  @Get(':showId')
  async getShowById(@Param() param) {
    const { showId } = param;

    const shows = await this.showsService.findById(showId);

    return {
      statusCode: 201,
      message: CustomHttpSuccess['GET_SHOW_BY_ID'],
      data: shows,
    };
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
    // !TODO: Guard로 변경
    if (!user.isAdmin) {
      throw new HttpException(CustomHttpException['UNAUTHORIZED_EXCEPTION'], HttpStatus.UNAUTHORIZED);
    }
    const createdShow = await this.showsService.createShow(body);

    return {
      statusCode: 201,
      message: CustomHttpSuccess['CREATE_SHOW'],
      data: createdShow,
    };
  }
}
