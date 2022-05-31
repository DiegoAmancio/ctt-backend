import { AuthorDto, CreateAuthorDTO, UpdateAuthorDTO } from '../dto';

export interface IAuthorService {
  createAuthor(data: CreateAuthorDTO): Promise<AuthorDto>;
  getAuthor(id: string): Promise<AuthorDto>;
  updateAuthor(data: UpdateAuthorDTO): Promise<string>;
  deleteAuthor(data: string): Promise<boolean>;
}
