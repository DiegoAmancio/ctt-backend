import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { User } from '@infrastructure/database/model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.authorsRegistered)
  registeredBy: User;

  @ManyToOne(() => User, (user) => user.authorsUpdated)
  updatedBy: User;

  @OneToMany(() => LiteraryWork, (literaryWork) => literaryWork.ilustratorBy)
  literaryWorksIllustrated: LiteraryWork[];

  @OneToMany(() => LiteraryWork, (literaryWork) => literaryWork.writterBy)
  literaryWorksWritten: LiteraryWork[];
}
