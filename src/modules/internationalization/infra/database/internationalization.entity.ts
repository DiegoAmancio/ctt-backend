import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Language } from '@shared/enum/language.enum';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Edition, Type, PaperType } from '@shared/enum';

@ObjectType()
@Entity('internationalizations')
export class Internationalization {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    type: 'enum',
    enum: Language,
    default: Language.enUS,
  })
  language: Language;

  @Field()
  @Column()
  synopsis: string;

  @Field()
  @Column({
    type: 'enum',
    enum: Edition,
  })
  edition: Edition;

  @Field()
  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type;

  @Field()
  @Column({
    type: 'enum',
    enum: PaperType,
  })
  paperType: PaperType;


  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(
    () => LiteraryWork,
    (literaryWork) => literaryWork.internationalization,
  )
  literaryWork: LiteraryWork;
}
