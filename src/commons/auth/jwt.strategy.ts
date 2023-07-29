import { UsersService } from './../../users/users.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (private usersService: UsersService){
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: 
        });
    }

    async validate(payload) {}
        
}
