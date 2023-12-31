import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity('user')
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @ApiProperty({
    example: '2',
    description: 'userId',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'jjj@gmail.com',
    description: '계정 이메일',
    required: true,
  })
  @Column({ type: 'varchar', length: 40, name: 'email' })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'a12345',
    description: '계정 비밀번호',
    required: true,
  })
  @Column({ type: 'varchar', length: 100, name: 'password' })
  password: string;

  @IsString()
  @ApiProperty({
    example: '장두혁',
    description: '계정 이름',
    required: true,
  })
  @Column({ type: 'varchar', length: 30, name: 'name' })
  name: string;

  @IsNumber()
  @ApiProperty({
    example: '100000',
    description: '계정 보유 포인트',
    required: true,
  })
  @Column({ type: 'int', name: 'point' })
  point: number;

  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'admin 계정 유무',
    required: true,
  })
  @Column({ type: 'boolean', name: 'isAdmin' })
  isAdmin: boolean;

  @ApiProperty({
    example: '2023-07-29T14:52:33.263Z',
    description: '계정 생성 날짜',
    required: true,
  })
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservation: ReservationEntity[];
}
