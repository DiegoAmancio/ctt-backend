import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '@modules/auth/jwt/role.enum';
import { Author } from '@modules/author/infra/database';
import { MyCollection } from '@modules/myCollection/infra/database';
@ObjectType()
@Entity('users')
export class User {
  @Field()
  @PrimaryColumn({ precision: 30, type: 'bigint' })
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: string;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Author, (author) => author.registeredBy)
  authorsRegistered: Author[];

  @OneToMany(() => Author, (author) => author.updatedBy)
  authorsUpdated: Author[];

  @OneToOne(() => MyCollection, (myCollection) => myCollection.user)
  myCollection: MyCollection;
}
