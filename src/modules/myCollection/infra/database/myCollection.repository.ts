import { AbstractRepository, EntityRepository } from 'typeorm';
import { IMyCollectionRepository } from '@modules/myCollection/interfaces';
import { MyCollection } from './myCollection.entity';
import { CreateMyCollectionRepository } from '@modules/myCollection/Dto';
import { Logger } from '@nestjs/common';
import { User } from '@modules/user/infra/database';

@EntityRepository(MyCollection)
export class MyCollectionRepository
  extends AbstractRepository<MyCollection>
  implements IMyCollectionRepository
{
  private readonly logger = new Logger('My Collection repository');

  async getMyCollection(id: string): Promise<MyCollection> {
    this.logger.log('getMyCollection: ' + id);

    const myCollection = await this.repository.findOneBy({
      user: new User({ id: id }),
    });

    return myCollection;
  }
  createAndSaveMyCollection(
    data: CreateMyCollectionRepository,
  ): Promise<MyCollection> {
    this.logger.log('createAndSaveMyCollection: ' + JSON.stringify(data));
    const myCollection = this.repository.create(data);
    this.logger.log(
      'createAndSaveMyCollection: ' + JSON.stringify(myCollection),
    );

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
