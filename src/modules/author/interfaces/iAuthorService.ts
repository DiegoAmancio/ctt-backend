import { Author } from '../infra/database';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../dto';

export interface IAuthorService {
  createAuthor(data: CreateAuthorDTO): Promise<Author>;
  getAuthor(data: string): Promise<Author>;
  updateAuthor(data: UpdateAuthorDTO): Promise<string>;
  deleteAuthor(data: string): Promise<boolean>;
}
