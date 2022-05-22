import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '@modules/user/infra/database';

@ObjectType()
@Entity('myCollections')
export class MyCollection {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'int' })
  totalLiteraryWorks: number;

  @Field()
  @Column({ type: 'int' })
  completeLiteraryWorks: number;

  @Field()
  @Column({ type: 'int' })
  collectionValue: number;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.myCollection, { cascade: true })
  @JoinColumn()
  user: User;
}
