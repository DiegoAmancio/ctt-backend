import { Language } from '@shared/enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { LiteraryWork } from './literaryWork';
import { Volume } from './volume';

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
