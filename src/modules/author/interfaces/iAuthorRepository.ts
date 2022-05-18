import { UpdateAuthorDTO } from '../dto';
import { Author } from '../infra/database';

export interface IAuthorRepository {
  createAndSaveAuthor(name: string, imageUrl: string): Promise<Author>;
  updateAuthor(data: UpdateAuthorDTO): Promise<boolean>;
  deleteAuthor(data: Author): Promise<boolean>;
  getAuthor(id: string): Promise<Author>;
}
