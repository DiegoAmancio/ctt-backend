import { Author } from '@infrastructure/database/model';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { UserVolume } from '@modules/volumes/infra/database';
import { Role } from '@domain/jwt/role.enum';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ precision: 30, type: 'bigint' })
  id?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  name?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role?: Role;

  @Column()
  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Author, (author) => author.registeredBy)
  authorsRegistered?: Author[];

  @OneToMany(() => Author, (author) => author.updatedBy)
  authorsUpdated?: Author[];

  @OneToMany(() => LiteraryWork, (literaryWork) => literaryWork.registeredBy)
  literaryWorkRegistered?: LiteraryWork[];

  @OneToMany(() => LiteraryWork, (literaryWork) => literaryWork.updatedBy)
  literaryWorkUpdated?: LiteraryWork[];

  @OneToMany(() => UserVolume, (userVolume) => userVolume.user)
  volumes?: UserVolume[];

  public constructor(init?: any) {
    Object.assign(this, init);
  }
}
