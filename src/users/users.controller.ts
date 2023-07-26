import { Controller, Get, Post, Req, Res } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Req() req) {
    return req.user;
  }

  @Post()
  postUsers() {}

  @Post('signup')
  signup() {}

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
