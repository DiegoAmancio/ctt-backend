import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../dto';
import { IAuthorRepository, IAuthorService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorRepository, Author } from '../infra/database';

@Injectable()
export class AuthorService implements IAuthorService {
  private readonly logger = new Logger('Author service');
  constructor(
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: IAuthorRepository,
  ) {}
  async createAuthor({ name, imageUrl }: CreateAuthorDTO): Promise<Author> {
    this.logger.log('createAuthor');
    return this.authorRepository.createAndSaveAuthor(name, imageUrl);
  }
  async getAuthor(id: string): Promise<Author> {
    this.logger.log('getAuthor' + id);
    const Author = await this.authorRepository.getAuthor(id);

    if (!Author) {
      throw new NotFoundException('Author not found');
    }
    return Author;
  }
  async updateAuthor(updateAuthorData: UpdateAuthorDTO): Promise<string> {
    this.logger.log('updateAuthor');

    const Author = await this.getAuthor(updateAuthorData.id);

    const data = Object.assign(Author, updateAuthorData);

    await this.authorRepository.updateAuthor(data);
    return 'Author updated';
  }
  async deleteAuthor(authorId: string): Promise<boolean> {
    this.logger.log('deleteAuthor');
    const Author = await this.getAuthor(authorId);

    const isDeleted = await this.authorRepository.deleteAuthor(Author);

    return isDeleted;
  }
}
