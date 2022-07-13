import { AuthorDto, CreateAuthorDTO, UpdateAuthorDTO } from '../dto';
import { getAllAuthor } from '../dto/getAllAuthor.dto';

export interface IAuthorService {
  getAllAuthors(data: getAllAuthor): Promise<AuthorDto[]>;
  createAuthor(data: CreateAuthorDTO): Promise<AuthorDto>;
  getAuthor(id: string): Promise<AuthorDto>;
  getAuthors(ids?: string[]): Promise<AuthorDto[]>;
  updateAuthor(data: UpdateAuthorDTO): Promise<string>;
  deleteAuthor(data: string): Promise<boolean>;
}
