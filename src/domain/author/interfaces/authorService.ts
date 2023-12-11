import { AuthorDto, CreateAuthorDTO, UpdateAuthorDTO } from '../dto';

export interface AuthorServiceImp {
  createAuthor(data: CreateAuthorDTO): Promise<AuthorDto>;
  getAuthor(id: string): Promise<AuthorDto>;
  getAuthors(ids?: string[]): Promise<AuthorDto[]>;
  updateAuthor(data: UpdateAuthorDTO): Promise<string>;
  deleteAuthor(data: string): Promise<boolean>;
}
