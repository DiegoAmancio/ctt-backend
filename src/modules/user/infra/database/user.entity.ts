import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '@modules/auth/jwt/role.enum';
@ObjectType()
@Entity('users')
export class User {
  @Field()
  @PrimaryColumn()
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
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
