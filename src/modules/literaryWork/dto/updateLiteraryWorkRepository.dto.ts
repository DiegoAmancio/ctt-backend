import { Author } from '@modules/author/infra/database';
import { User } from '@modules/user/infra/database';
import { UpdateLiteraryWorkDTO } from '.';

export interface UpdateLiteraryWorkRepository
  extends Omit<UpdateLiteraryWorkDTO, 'ilustratorBy' | 'writterBy'> {
  registeredBy: User;
  updatedBy: User;
  ilustratorBy: Author;
  writterBy: Author;
}
