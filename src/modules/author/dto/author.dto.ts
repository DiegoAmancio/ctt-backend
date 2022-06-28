import { Author } from '../infra/database';

export interface AuthorDto extends Omit<Author, 'registeredBy' | 'updatedBy'> {
  registeredBy: string;
  updatedBy: string;
}
