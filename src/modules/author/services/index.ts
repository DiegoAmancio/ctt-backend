import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthorDto, CreateAuthorDTO, UpdateAuthorDTO } from '../dto';
import { IAuthorRepository, IAuthorService } from '../interfaces';
import { Author } from '../infra/database';
import { I_USER_SERVICE, I_AUTHOR_REPOSITORY } from '@shared/utils/constants';
import { IUserService } from '@modules/user/interfaces';

@Injectable()
export class AuthorService implements IAuthorService {
  private readonly logger = new Logger('Author service');
  constructor(
    @Inject(I_AUTHOR_REPOSITORY)
    private readonly authorRepository: IAuthorRepository,
    @Inject(I_USER_SERVICE)
    private readonly userService: IUserService,
  ) {}
  async getAuthors(ids: string[] = []): Promise<AuthorDto[]> {
    this.logger.log('getAuthors: ids ' + ids);

    const authors = await this.authorRepository
      .getAuthors()
      .then((authors) =>
        authors.map((author) => this.mapperAuthorEntityToDto(author)),
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
  }: CreateAuthorDTO): Promise<AuthorDto> {
    this.logger.log('createAuthor');
    const user = await this.userService.getUser(adminId);
    const authorSaved = await this.authorRepository.createAndSaveAuthor({
      name,
      imageUrl,
      updatedBy: user,
      registeredBy: user,
    });

    return this.mapperAuthorEntityToDto(authorSaved);
  }
  async getAuthor(id: string): Promise<AuthorDto> {
    this.logger.log('getAuthor' + id);
    const author = await this.authorRepository.getAuthor(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return this.mapperAuthorEntityToDto(author);
  }
  async updateAuthor(updateAuthorData: UpdateAuthorDTO): Promise<string> {
    this.logger.log('updateAuthor');

    const author = await this.authorRepository.getAuthor(updateAuthorData.id);
    const user = await this.userService.getUser(updateAuthorData.adminId);

    const data = Object.assign(author, updateAuthorData);
    if (author && user) {
      await this.authorRepository.updateAuthor({
        ...data,
        registeredBy: author.registeredBy,
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
    const isDeleted = await this.authorRepository.deleteAuthor(author.id);

    return isDeleted;
  }

  mapperAuthorEntityToDto = (author: Author): AuthorDto => {
    const authorMapped = {
      ...author,
      registeredBy: author.registeredBy.name,
      updatedBy: author.updatedBy.name,
    };
    return authorMapped;
  };
}
