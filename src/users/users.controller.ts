import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SignupRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/commons/dto/user.dto';

@ApiTags('users')
@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    type: UserDto,
    status: 201,
    description: '성공',
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get('me')
  getUsers(@Req() req) {
    return req.user;
  }

  @ApiResponse({
    type: UserDto,
    status: 201,
    description: '성공',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  signup(@Body() body: SignupRequestDto) {
    this.usersService.createUsers(body.email, body.isAdmin, body.password, body.confirm);
  }

  @ApiOkResponse({ description: '로그인 성공' })
  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  signin(@Req() req) {
    return req.user;
  }

  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiOperation({ summary: '로그아웃' })
  @Post('signout')
  signout(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
