import {
  AuthorDTO,
  CreateAuthorDTO,
  UpdateAuthorDTO,
} from '@domain/author/dto';
import {
  AuthorServiceImp,
  AuthorRepositoryImpl,
} from '@domain/author/interfaces';
import { Author, User } from '@infrastructure/database/model';
import { UserServiceImp } from '@domain/user/interfaces';
import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common';
import { AUTHOR_REPOSITORY, USER_SERVICE } from '@shared/utils/constants';
import { UserDTO } from '@domain/user/dto';

@Injectable()
export class AuthorService implements AuthorServiceImp {
  private readonly logger = new Logger(AuthorService.name);
  constructor(
    @Inject(AUTHOR_REPOSITORY)
    private readonly authorRepository: AuthorRepositoryImpl,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceImp,
  ) {}
  async getAuthors(ids: string[] = []): Promise<AuthorDTO[]> {
    this.logger.log('getAuthors: ids ' + ids);

    const authors = await this.authorRepository
      .getAuthors()
      .then((authors) =>
        authors.map((author) => this.mapperAuthorEntityToDTO(author)),
      );

    if (ids.length > 0) {
      const authorsFiltered = authors.filter((author) =>
        ids.includes(author.id),
      );

      if (authorsFiltered.length !== ids.length) {
        throw new NotFoundException('Authors Not Found');
      }

      return authorsFiltered;
    }

    return authors;
  }
  async createAuthor({
    name,
    imageUrl,
    adminId,
  }: CreateAuthorDTO): Promise<AuthorDTO> {
    this.logger.log('createAuthor');
    const user = await this.userService.getUser(adminId);
    const authorSaved = await this.authorRepository.create({
      name,
      imageUrl,
      updatedBy: new User(user),
      registeredBy: new User(user),
    });

    return this.mapperAuthorEntityToDTO(authorSaved);
  }
  async getAuthor(id: string): Promise<AuthorDTO> {
    this.logger.log('getAuthor' + id);
    const author = await this.authorRepository.get(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return this.mapperAuthorEntityToDTO(author);
  }
  async updateAuthor(updateAuthorData: UpdateAuthorDTO): Promise<string> {
    this.logger.log('updateAuthor');

    const author = await this.authorRepository.get(updateAuthorData.id);
    const user = await this.userService.getUser(updateAuthorData.adminId);

    const data = Object.assign(author, updateAuthorData);
    if (author && user) {
      await this.authorRepository.update({
        ...data,
        registeredBy: new UserDTO(author.registeredBy),
        updatedBy: user,
      });
      return 'Author updated';
    }
    throw new NotFoundException('Cant update author');
  }
  async deleteAuthor(authorId: string): Promise<boolean> {
    this.logger.log('deleteAuthor');
    const author = await this.getAuthor(authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const isDeleted = await this.authorRepository.delete(author.id);

    return isDeleted;
  }

  mapperAuthorEntityToDTO = (author: Author): AuthorDTO => {
    const authorMapped = {
      ...author,
      registeredBy: author.registeredBy.name,
      updatedBy: author.updatedBy.name,
    };
    return authorMapped;
  };
}
