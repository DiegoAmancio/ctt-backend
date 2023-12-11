import { Internationalization } from '@modules/internationalization/infra/database';
import { User } from '@modules/user/infra/database';
import { Volume } from '@modules/volumes/infra/database';
import { Language, Status, Edition, PaperType, Type } from '@shared/enum';
import { Author } from 'infrastructure/database/model';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

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
  originalPublisher: string;

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
  releaseFrequency: string;

  @Column()
  startOfPublication: Date;

  @Column({ nullable: true })
  endOfPublication: Date;

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

  @ManyToOne(() => Author, (author) => author.literaryWorksIllustrated)
  ilustratorBy: Author;

  @ManyToOne(() => Author, (author) => author.literaryWorksWritten)
  writterBy: Author;

  @OneToMany(
    () => Internationalization,
    (internationalization) => internationalization.literaryWork,
  )
  internationalization: Internationalization[];

  @OneToMany(() => Volume, (volume) => volume.literaryWork)
  volumes: Volume[];
  public constructor(init?: Partial<LiteraryWork>) {
    Object.assign(this, init);
  }
}
