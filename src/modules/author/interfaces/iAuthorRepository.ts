import { CreateAuthorRepository, UpdateAuthorRepository } from '../dto';
import { getAllAuthor } from '../dto/getAllAuthor.dto';
import { Author } from '../infra/database';

export interface IAuthorRepository {
  getAllAuthors(data: getAllAuthor): Promise<Author[]>;
  createAndSaveAuthor(data: CreateAuthorRepository): Promise<Author>;
  updateAuthor(data: UpdateAuthorRepository): Promise<boolean>;
  getAuthors(): Promise<Author[]>;
  deleteAuthor(id: string): Promise<boolean>;
  getAuthor(id: string): Promise<Author>;
}
