import { Author } from '@modules/author/infra/database';
import { User } from '@modules/user/infra/database';
import { UpdateLiteraryWorkDTO } from '.';

export interface UpdateLiteraryWorkRepository
  extends Omit<
    UpdateLiteraryWorkDTO,
    'categories' | 'ilustratorBy' | 'writterBy' | 'adminId'
  > {
  registeredBy: User;
  updatedBy: User;
  ilustratorBy: Author;
  writterBy: Author;
  categories: string;
}
