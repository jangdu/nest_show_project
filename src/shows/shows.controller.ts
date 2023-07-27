import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/shows')
export class ShowsController {
  @Get()
  getShows() {}

  @Get()
  getShowByKeyword(@Query() query) {}

  @Get(':id')
  getShowById(@Param() param) {
    console.log(param.id);
  }

  @Post()
  createShow(@Body() body) {}
}
