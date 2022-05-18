import { CreateAuthorRepository, UpdateAuthorRepository } from '../dto';
import { Author } from '../infra/database';

export interface IAuthorRepository {
  createAndSaveAuthor(data: CreateAuthorRepository): Promise<Author>;
  updateAuthor(data: UpdateAuthorRepository): Promise<boolean>;
  deleteAuthor(id: string): Promise<boolean>;
  getAuthor(id: string): Promise<Author>;
}
