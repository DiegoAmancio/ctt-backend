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
import { Edition, PaperType, Status, Type } from '@shared/enum/';
import { Internationalization } from '@modules/internationalization/infra/database';
@Entity('literaryWorks')
export class LiteraryWork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  bagShape: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.enUS,
  })
  language: Language;

  @Column()
  publisher: string;

  @Column()
  dimensions: string;

  @Column()
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.InProgress,
  })
  status: Status;

  @Column()
  country: string;

  @Column()
  categories: string;

  @Column({
    type: 'enum',
    enum: Edition,
  })
  edition: Edition;

  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type;

  @Column({
    type: 'enum',
    enum: PaperType,
  })
  paperType: PaperType;

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

  @OneToMany(
    () => Internationalization,
    (internationalization) => internationalization.literaryWork,
  )
  internationalization: Internationalization[];
}
