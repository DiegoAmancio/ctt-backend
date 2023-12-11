import { User } from '@modules/user/infra/database';
import { UpdateAuthorDTO } from './';

export interface UpdateAuthorRepository
  extends Omit<UpdateAuthorDTO, 'adminId'> {
  registeredBy: User;
  updatedBy: User;
}
