import { AbstractRepository, EntityRepository } from 'typeorm';
import { IMyCollectionRepository } from '@modules/myCollection/interfaces';
import { MyCollection } from './myCollection.entity';
import { CreateMyCollectionRepository } from '@modules/myCollection/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(MyCollection)
export class MyCollectionRepository
  extends AbstractRepository<MyCollection>
  implements IMyCollectionRepository
{
  private readonly logger = new Logger('My Collection repository');

  async getMyCollection(id: string): Promise<MyCollection> {
    this.logger.log('getMyCollection: ' + id);

    const Author = await this.repository.findOne(id);

    return Author;
  }
  createAndSaveMyCollection(
    data: CreateMyCollectionRepository,
  ): Promise<MyCollection> {
    this.logger.log('createAndSaveMyCollection: ' + JSON.stringify(data));
    const myCollection = this.repository.create(data);

    return this.repository.save(myCollection);
  }
  async updateMyCollection(id: string): Promise<boolean> {
    this.logger.log('updateMyCollection: ' + JSON.stringify(id));
    const result = { affected: 1 };

    return result.affected > 0;
  }
  async deleteMyCollection(id: string): Promise<boolean> {
    this.logger.log('deleteMyCollection ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
