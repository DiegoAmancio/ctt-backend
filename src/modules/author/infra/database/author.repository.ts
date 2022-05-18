import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAuthorRepository } from '@modules/author/interfaces/iAuthorRepository';
import { Author } from './author.entity';
import {
  CreateAuthorRepository,
  UpdateAuthorRepository,
} from '@modules/author/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(Author)
export class AuthorRepository
  extends AbstractRepository<Author>
  implements IAuthorRepository
{
  private readonly logger = new Logger('Author repository');

  async getAuthor(id: string): Promise<Author> {
    this.logger.log('getAuthor: ' + id);

    const Author = await this.repository.findOne(id);

    return Author;
  }
  createAndSaveAuthor(data: CreateAuthorRepository): Promise<Author> {
    this.logger.log('createAndSaveAuthor: ' + JSON.stringify(data));
    const Author = this.repository.create(data);

    return this.repository.save(Author);
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
