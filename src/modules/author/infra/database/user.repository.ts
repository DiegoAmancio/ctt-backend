import { AbstractRepository, EntityRepository } from 'typeorm';
import { IAuthorRepository } from '@modules/author/interfaces/iAuthorRepository';
import { Author } from './author.entity';
import { UpdateAuthorDTO } from '@modules/author/Dto';
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
  createAndSaveAuthor(
    id: string,
    email: string,
    name: string,
  ): Promise<Author> {
    this.logger.log('createAndSaveAuthor: ' + JSON.stringify({ email, name }));
    const Author = this.repository.create({
      id: id,
      email: email,
      name: name,
    });

    return this.repository.save(Author);
  }
  async updateAuthor(data: UpdateAuthorDTO): Promise<boolean> {
    this.logger.log('updateAuthor: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteAuthor(Author: Author): Promise<boolean> {
    this.logger.log('deleteAuthor ' + JSON.stringify(Author));

    const result = await this.repository.delete(Author.id);
    return result.affected > 0;
  }
}
