import { AuthorDto } from '@domain/author/dto';
import { Role } from '@domain/jwt/role.enum';
import { LiteraryWorkDto } from '@modules/literaryWork/dto';
import { UserVolumeDTO } from '@modules/volumes/dto';

export class UserDTO {
  id?: string;
  email?: string;
  name?: string;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
  authorsRegistered?: AuthorDto[];
  authorsUpdated?: AuthorDto[];
  literaryWorkRegistered?: LiteraryWorkDto[];
  literaryWorkUpdated?: LiteraryWorkDto[];
  volumes?: UserVolumeDTO[];

  constructor(data: any) {
    Object.assign(this, data);
  }
}
