import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { SigninRequestDto, SignupRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/commons/dto/user.dto';
import { CustomHttpSuccess } from 'src/commons/constants/http-success.constants';
import { AccessTokenDto, MeResponseDto, SigninResponseDto, SignupResponseDto } from './dto/user.response.dto';
import { Token } from 'src/commons/decorators/token.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // 내 정보 조회
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiCreatedResponse({
    type: MeResponseDto,
    description: CustomHttpSuccess['GET_MY_INFO_SUCCESS'],
  })
  @ApiBearerAuth()
  @ApiSecurity('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyInfo(@Token() user: UserEntity): Promise<MeResponseDto> {
    const myUser = await this.usersService.getMyInfo(user);

    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_MY_INFO_SUCCESS'],
      data: myUser,
    };
  }

  // 회원가입
  @ApiResponse({
    type: SignupResponseDto,
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
  @ApiOkResponse({ description: '로그인 성공', status: 200, type: SigninResponseDto })
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
