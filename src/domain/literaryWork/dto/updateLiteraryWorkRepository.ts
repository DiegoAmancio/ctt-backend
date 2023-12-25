import { Author } from '@infrastructure/database/model';
import { User } from '@infrastructure/database/model';
import { UpdateLiteraryWorkDTO } from './updateLiteraryWork';

export interface UpdateLiteraryWorkRepository
  extends Omit<
    UpdateLiteraryWorkDTO,
    'categories' | 'ilustratorBy' | 'writterBy'
  > {
  registeredBy: User;
  updatedBy: User;
  ilustratorBy: Author;
  writterBy: Author;
  categories: string;
}
