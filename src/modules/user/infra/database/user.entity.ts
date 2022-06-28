import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Role } from '@modules/auth/jwt/role.enum';
import { Author } from '@modules/author/infra/database';
import { MyCollection } from '@modules/myCollection/infra/database';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
@Entity('users')
export class User {
  @PrimaryColumn({ precision: 30, type: 'bigint' })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Author, (author) => author.registeredBy)
  authorsRegistered: Author[];

  @OneToMany(() => Author, (author) => author.updatedBy)
  authorsUpdated: Author[];

  @OneToMany(() => LiteraryWork, (literaryWork) => literaryWork.registeredBy)
  literaryWorkRegistered: LiteraryWork[];

  @OneToMany(() => LiteraryWork, (literaryWork) => literaryWork.updatedBy)
  literaryWorkUpdated: LiteraryWork[];

  @OneToOne(() => MyCollection, (myCollection) => myCollection.user)
  myCollection: MyCollection;
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
