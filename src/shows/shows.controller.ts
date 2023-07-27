import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('shows')
@Controller('api/shows')
export class ShowsController {
  @ApiOperation({ summary: '공연 내역 전체 조회' })
  @Get()
  getShows() {}

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

  @ApiOperation({ summary: '공연 생성' })
  @Post()
  createShow(@Body() body) {}
}
