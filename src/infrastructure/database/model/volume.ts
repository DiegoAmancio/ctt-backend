import { User } from '@infrastructure/database/model';
import { Internationalization } from '@infrastructure/database/model/internationalization';
import { LiteraryWork } from '@infrastructure/database/model';
import { Language, Coin, PaperType } from '@shared/enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserVolume } from './userVolume';

@Entity('volumes')
export class Volume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.enUS,
  })
  language: Language;

  @Column({
    type: 'enum',
    enum: Coin,
    default: Coin.USD,
  })
  coverPriceUnit: Coin;

  @Column()
  coverPrice: number;

  @Column()
  number: number;

  @Column()
  imageUrl: string;

  @Column()
  publication: Date;

  @Column({
    type: 'enum',
    enum: PaperType,
  })
  paperType: PaperType;

  @Column()
  dimensions: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.literaryWorkRegistered)
  registeredBy: User;

  @ManyToOne(() => User, (user) => user.literaryWorkUpdated)
  updatedBy: User;

  @ManyToOne(() => LiteraryWork, (literaryWork) => literaryWork.volumes)
  literaryWork: LiteraryWork;

  @OneToMany(
    () => Internationalization,
    (internationalization) => internationalization.volume,
  )
  internationalization: Internationalization[];

  @OneToMany(() => UserVolume, (userVolume) => userVolume.volume)
  userVolumes: UserVolume[];
}
