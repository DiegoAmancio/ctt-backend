import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '@modules/user/infra/database';
import { Language } from '@shared/enum/language.enum';
import { Coin, PaperType } from '@shared/enum/';
import { Internationalization } from '@modules/internationalization/infra/database';
import { LiteraryWork } from '@modules/literaryWork/infra/database';

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
}
