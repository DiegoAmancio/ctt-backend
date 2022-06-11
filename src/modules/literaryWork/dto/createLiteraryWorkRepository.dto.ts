import { Author } from '@modules/author/infra/database';
import { User } from '@modules/user/infra/database';
import { CreateLiteraryWorkDTO } from './createLiteraryWork.dto';

export interface CreateLiteraryWorkRepository
  extends Omit<CreateLiteraryWorkDTO, 'ilustratorBy' | 'writterBy'> {
  registeredBy: User;
  updatedBy: User;
  ilustratorBy: Author;
  writterBy: Author;
}
