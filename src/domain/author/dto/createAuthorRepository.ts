import { User } from '@infrastructure/database/model';
import { CreateAuthorDTO } from './createAuthor';

export interface CreateAuthorRepository
  extends Omit<CreateAuthorDTO, 'adminId'> {
  registeredBy: User;
  updatedBy: User;
}
