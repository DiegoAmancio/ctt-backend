import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '@modules/user/infra/database';
import { Language } from '@shared/enum/language.enum';
import { Status } from '@shared/enum/';
import { Internationalization } from '@modules/Internationalization/infra/database';
@ObjectType()
@Entity('literaryWork')
export class LiteraryWork {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  bagShape: string;

  @Field()
  @Column({
    type: 'enum',
    enum: Language,
    default: Language.americanEnglish,
  })
  language: Language;

  @Field()
  @Column()
  synopsis: string;

  @Field()
  @Column()
  publisher: string;

  @Field()
  @Column()
  dimensions: string;

  @Field()
  @Column()
  imageUrl: string;

  @Field()
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.InProgress,
  })
  status: Status;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  categories: string;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
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
