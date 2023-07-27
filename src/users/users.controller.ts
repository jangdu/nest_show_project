import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getUsers(@Req() req) {
    return req.user;
  }

  @Post()
  postUsers() {}

  @Post('signup')
  signup(@Body() body: UserRequestDto) {
    this.usersService.createUsers(body.email, body.isAdmin, body.password, body.confirm);
  }

  @Post('signin')
  signin(@Req() req) {
    return req.user;
  }

  @Post('signout')
  signout(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
