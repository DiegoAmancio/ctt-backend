import { User } from '@modules/user/infra/database';
import { CreateAuthorDTO } from './createAuthor.dto';

export interface CreateAuthorRepository
  extends Omit<CreateAuthorDTO, 'adminId'> {
  registeredBy: User;
  updatedBy: User;
}
