import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Coin } from '@shared/enum/';
import { Volume } from './volume.entity';
import { User } from '@modules/user/infra/database';

@Entity('userVolumes')
export class UserVolume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  purchasedPrice: number;

  @Column()
  purchasedDate: Date;

  @Column({
    type: 'enum',
    enum: Coin,
  })
  purchasedPriceUnit: Coin;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.volumes)
  user: User;

  @ManyToOne(() => Volume, (volume) => volume.userVolumes)
  volume: Volume;
}
