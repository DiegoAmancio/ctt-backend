import { AuthorDTO } from '@domain/author/dto';
import { Role } from '@domain/jwt/role.enum';
import { LiteraryWorkDTO } from '@domain/literaryWork/dto';
import { UserVolumeDTO } from '@modules/volumes/dto';

export class UserDTO {
  id?: string;
  email?: string;
  name?: string;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
  authorsRegistered?: AuthorDTO[];
  authorsUpdated?: AuthorDTO[];
  literaryWorkRegistered?: LiteraryWorkDTO[];
  literaryWorkUpdated?: LiteraryWorkDTO[];
  volumes?: UserVolumeDTO[];

  constructor(data: any) {
    Object.assign(this, data);
  }
}
