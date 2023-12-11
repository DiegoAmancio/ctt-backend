import { Author } from 'infrastructure/database/model';
import { CreateAuthorRepository, UpdateAuthorRepository } from '../dto';

export interface AuthorRepositoryImpl {
  create(data: CreateAuthorRepository): Promise<Author>;
  get(id: string): Promise<Author>;
  getAuthors(ids?: string[]): Promise<Author[]>;
  update(data: UpdateAuthorRepository): Promise<boolean>;
  delete(data: string): Promise<boolean>;
}
