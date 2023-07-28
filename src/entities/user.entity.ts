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

@Entity('user')
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 40, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 100, name: 'password', select: false })
  password: string;

  @Column({ type: 'varchar', length: 30, name: 'name' })
  name: string;

  @Column({ type: 'int', name: 'point' })
  point: number;

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
