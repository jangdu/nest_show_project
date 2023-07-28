import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ShowEntity } from './show.entity';
import { SeatEntity } from './seat.entity';

@Entity('reservation')
export class ReservationEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  userId: number;

  @Column()
  showId: number;

  @Column()
  seatId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => UserEntity, (user) => user.reservation)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: UserEntity;

  @ManyToOne(() => ShowEntity, (show) => show.reservation)
  @JoinColumn([{ name: 'showId', referencedColumnName: 'id' }])
  show: ShowEntity;

  @ManyToOne(() => SeatEntity, (seat) => seat.reservation)
  @JoinColumn([{ name: 'seatId', referencedColumnName: 'id' }])
  seat: SeatEntity;
}
