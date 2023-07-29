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

@Entity('user')
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'jjj@gmail.com',
    description: '계정 이메일',
    required: true,
  })
  @Column({ type: 'varchar', length: 40, name: 'email' })
  email: string;

  @ApiProperty({
    example: 'a12345',
    description: '계정 비밀번호',
    required: true,
  })
  @Column({ type: 'varchar', length: 100, name: 'password', select: false })
  password: string;

  @ApiProperty({
    example: '장두혁',
    description: '계정 이름',
    required: true,
  })
  @Column({ type: 'varchar', length: 30, name: 'name' })
  name: string;

  @ApiProperty({
    example: '100000',
    description: '계정 보유 포인트',
    required: true,
  })
  @Column({ type: 'int', name: 'point' })
  point: number;

  @ApiProperty({
    example: 'true',
    description: 'admin 계정 유무',
    required: true,
  })
  @Column({ type: 'boolean', name: 'isAdmin' })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservation: ReservationEntity[];
}
