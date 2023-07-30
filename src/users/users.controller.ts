import { Body, Controller, Get, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { SigninRequestDto, SignupRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/commons/dto/user.dto';
import { User } from 'src/commons/decorators/user.decorator';
import { CustomHttpException } from 'src/commons/constants/http-exception.constant';
import { CustomHttpSuccess } from 'src/commons/constants/http-success.constants';
import { access } from 'fs';
import { AccessTokenDto, SigninResponseDto, SignupResponseDto } from './dto/user.response.dto';
import { AuthGuard } from '@nestjs/passport';

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
  getUsers(@User() user) {
    return user;
  }

  // 회원가입
  @ApiResponse({
    type: UserDto,
    status: 201,
    description: '성공',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signup(@Body() body: SignupRequestDto): Promise<SignupResponseDto> {
    const accessToken: AccessTokenDto = await this.usersService.signup(body);

    return {
      statusCode: 201,
      message: CustomHttpSuccess['SIGNUP_SUCCESS'],
      data: accessToken,
    };
  }

  // 로그인
  @ApiOkResponse({ description: '로그인 성공' })
  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  async signin(@Body() body: SigninRequestDto): Promise<SigninResponseDto> {
    const accessToken = await this.usersService.signin(body);

    return {
      statusCode: 200,
      message: CustomHttpSuccess['SIGNIN_SUCCESS'],
      data: accessToken,
    };
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
