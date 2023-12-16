import { Author } from '@infrastructure/database/model';
import { User } from '@infrastructure/database/model';
import { CreateLiteraryWorkDTO } from './createLiteraryWork.dto';

export interface CreateLiteraryWorkRepository
  extends Omit<
    CreateLiteraryWorkDTO,
    'categories' | 'ilustratorBy' | 'writterBy'
  > {
  registeredBy: User;
  updatedBy: User;
  ilustratorBy: Author;
  writterBy: Author;
  categories: string;
}
