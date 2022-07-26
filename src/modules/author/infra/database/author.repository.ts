import { DataSource, Repository } from 'typeorm';
import { IAuthorRepository } from '@modules/author/interfaces/iAuthorRepository';
import { Author } from './author.entity';
import {
  CreateAuthorRepository,
  UpdateAuthorRepository,
} from '@modules/author/dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthorRepository implements IAuthorRepository {
  private readonly repository: Repository<Author>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Author);
  }
  async getAuthors(): Promise<Author[]> {
    const authors = await this.repository.find({
      relations: ['registeredBy', 'updatedBy'],
    });

    return authors;
  }
  private readonly logger = new Logger('Author repository');

  async getAuthor(id: string): Promise<Author> {
    this.logger.log('getAuthor: ' + id);

    const Author = await this.repository.findOne({
      where: { id: id },
      relations: ['registeredBy', 'updatedBy'],
    });

    return Author;
  }

  createAndSaveAuthor(data: CreateAuthorRepository): Promise<Author> {
    this.logger.log('createAndSaveAuthor: ' + JSON.stringify(data));
    const author = this.repository.create(data);
    this.logger.log('createAndSaveAuthor: ' + JSON.stringify(author));

    return this.repository.save(author);
  }
  async updateAuthor(data: UpdateAuthorRepository): Promise<boolean> {
    this.logger.log('updateAuthor: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteAuthor(id: string): Promise<boolean> {
    this.logger.log('deleteAuthor ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
