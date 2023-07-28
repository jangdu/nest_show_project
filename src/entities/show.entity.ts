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

@Entity('show')
export class ShowEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 30, name: 'title' })
  title: string;

  @Column({ type: 'varchar', length: 50, name: 'location', select: false })
  location: string;

  @Column({ type: 'varchar', length: 30, name: 'category' })
  category: string;

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
