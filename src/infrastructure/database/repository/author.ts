import { Injectable, Logger } from '@nestjs/common';
import {
  CreateAuthorRepository,
  UpdateAuthorRepository,
} from '@domain/author/dto';
import { AuthorRepositoryImpl } from '@domain/author/interfaces';
import { Repository, DataSource } from 'typeorm';
import { Author } from '../model';

@Injectable()
export class AuthorRepository implements AuthorRepositoryImpl {
  private readonly repository: Repository<Author>;
  private readonly logger = new Logger(AuthorRepository.name);

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Author);
  }

  async getAuthors(): Promise<Author[]> {
    this.logger.log('getAuthors');

    return this.repository.find({
      relations: ['registeredBy', 'updatedBy'],
    });
  }

  get(id: string): Promise<Author> {
    this.logger.log('getAuthor: ' + id);

    return this.repository.findOne({
      where: { id: id },
      relations: ['registeredBy', 'updatedBy'],
    });
  }

  create(data: CreateAuthorRepository): Promise<Author> {
    this.logger.log('create: ' + JSON.stringify(data));

    const author = this.repository.create(data);
    return this.repository.save(author);
  }
  async update(data: UpdateAuthorRepository): Promise<boolean> {
    this.logger.log('update: ' + JSON.stringify(data));

    const result = await this.repository.update(data.id, data);
    return result.affected > 0;
  }
  async delete(id: string): Promise<boolean> {
    this.logger.log('delete ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
