import { AuthorDTO, CreateAuthorDTO, UpdateAuthorDTO } from '../dto';

export interface AuthorServiceImp {
  createAuthor(data: CreateAuthorDTO): Promise<AuthorDTO>;
  getAuthor(id: string): Promise<AuthorDTO>;
  getAuthors(ids?: string[]): Promise<AuthorDTO[]>;
  updateAuthor(data: UpdateAuthorDTO): Promise<string>;
  deleteAuthor(data: string): Promise<boolean>;
}
