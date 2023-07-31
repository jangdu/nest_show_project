import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ShowEntity } from './show.entity';
import { ReservationEntity } from './reservation.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('seat')
export class SeatEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNumber()
  @ApiProperty({
    example: '4',
    description: '공연 좌석',
    required: true,
  })
  @Column({ type: 'int', name: 'seatNumber' })
  seatNumber: number;

  @IsString()
  @ApiProperty({
    example: 'A',
    description: '공연 좌석 등급',
    required: true,
  })
  @Column({ type: 'varchar', length: 10, name: 'grade' })
  grade: string;

  @IsString()
  @ApiProperty({
    example: '10000',
    description: '공연 가격',
    required: true,
  })
  @Column({ type: 'int', name: 'price' })
  price: number;

  @IsString()
  @ApiProperty({
    example: '1',
    description: '공연장 id',
    required: true,
  })
  @Column()
  showId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.seat)
  reservation: ReservationEntity[];

  @ManyToOne(() => ShowEntity, (show) => show.seat)
  @JoinColumn([{ name: 'showId', referencedColumnName: 'id' }])
  show: ShowEntity;
}
