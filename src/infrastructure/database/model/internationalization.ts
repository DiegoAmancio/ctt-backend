import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Language } from '@shared/enum/language.enum';
import { LiteraryWork } from '@infrastructure/database/model';
import { Volume } from '@modules/volumes/infra/database';

@Entity('internationalizations')
export class Internationalization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.enUS,
  })
  language: Language;

  @Column()
  synopsis: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => LiteraryWork,
    (literaryWork) => literaryWork.internationalization,
  )
  literaryWork: LiteraryWork;

  @ManyToOne(() => Volume, (volume) => volume.internationalization)
  volume: Volume;
}
