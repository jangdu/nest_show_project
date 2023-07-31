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
import { SeatEntity } from './seat.entity';
import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('show')
export class ShowEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsString()
  @ApiProperty({
    example: '장두혁의 뮤지컬 1',
    description: '공연 이름',
    required: true,
  })
  @Column({ type: 'varchar', length: 30, name: 'title' })
  title: string;

  @IsString()
  @ApiProperty({
    example: '예술의 전당',
    description: '공연장 위치',
    required: true,
  })
  @Column({ type: 'varchar', length: 50, name: 'location', select: false })
  location: string;

  @IsString()
  @ApiProperty({
    example: '뮤지컬',
    description: '공연 카테고리',
    required: true,
  })
  @Column({ type: 'varchar', length: 30, name: 'category' })
  category: string;

  @IsDate()
  @ApiProperty({
    example: '2023-08-20 14:00:00',
    description: '공연 날짜 및 시간',
    required: true,
  })
  @Column({ type: 'datetime', name: 'date' })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => SeatEntity, (seat) => seat.show)
  seat: SeatEntity[];

  @OneToMany(() => ReservationEntity, (reservation) => reservation.show)
  reservation: ReservationEntity[];
}
