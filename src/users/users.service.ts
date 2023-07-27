import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createUsers(email: string, isAdmin: boolean, password: string, confirm: string) {}
}
