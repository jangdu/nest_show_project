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

@Entity('seat')
export class SeatEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'seatNumber' })
  seatNumber: number;

  @Column({ type: 'int', name: 'grade' })
  grade: number;

  @Column({ type: 'int', name: 'price' })
  price: number;

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
