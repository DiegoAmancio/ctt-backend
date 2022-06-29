import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@modules/user/infra/database';
import { UserVolume } from '@modules/volumes/infra/database';

@Entity('myCollections')
export class MyCollection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  totalLiteraryWorks: number;

  @Column({ type: 'int' })
  completeLiteraryWorks: number;

  @Column({ type: 'int' })
  collectionValue: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.myCollection, { cascade: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => UserVolume, (userVolume) => userVolume.collection)
  userVolumes: UserVolume[];
}
