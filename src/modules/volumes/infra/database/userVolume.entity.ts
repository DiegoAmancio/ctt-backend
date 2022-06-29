import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Coin } from '@shared/enum/';
import { MyCollection } from '@modules/myCollection/infra/database';
import { Volume } from './volume.entity';

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

  @ManyToOne(() => MyCollection, (myCollection) => myCollection.userVolumes)
  collection: MyCollection;

  @ManyToOne(() => Volume, (volume) => volume.userVolumes)
  volume: Volume;
}
