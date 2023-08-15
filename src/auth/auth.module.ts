import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [PassportModule.register({ session: true }), TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService],
})
export class AuthModule {}
