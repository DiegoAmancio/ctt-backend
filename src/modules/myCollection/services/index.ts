import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MyCollectionDto } from '../dto';
import { IMyCollectionRepository, IMyCollectionService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { MyCollectionRepository, MyCollection } from '../infra/database';

import { User } from '@modules/user/infra/database';

@Injectable()
export class MyCollectionService implements IMyCollectionService {
  private readonly logger = new Logger('MyCollection service');
  constructor(
    @InjectRepository(MyCollectionRepository)
    private readonly myCollectionRepository: IMyCollectionRepository,
  ) {}
  async createMyCollection(user: User): Promise<MyCollectionDto> {
    this.logger.log('createMyCollection');
    const MyCollectionSaved =
      await this.myCollectionRepository.createAndSaveMyCollection({
        collectionValue: 0,
        completeLiteraryWorks: 0,
        totalLiteraryWorks: 0,
        user: user,
      });

    return this.mapperMyCollectionEntityToDto(MyCollectionSaved);
  }
  async getMyCollection(id: string): Promise<MyCollectionDto> {
    this.logger.log('getMyCollection' + id);
    const myCollection = await this.myCollectionRepository.getMyCollection(id);

    if (!myCollection) {
      throw new NotFoundException('MyCollection not found');
    }
    return this.mapperMyCollectionEntityToDto(myCollection);
  }
  async updateMyCollection(id: string): Promise<string> {
    this.logger.log('updateMyCollection');

    await this.myCollectionRepository.updateMyCollection(id);
    return 'MyCollection updated';
  }
  async deleteMyCollection(MyCollectionId: string): Promise<boolean> {
    this.logger.log('deleteMyCollection');
    const MyCollection = await this.getMyCollection(MyCollectionId);
    if (!MyCollection) {
      throw new NotFoundException('MyCollection not found');
    }
    const isDeleted = await this.myCollectionRepository.deleteMyCollection(
      MyCollection.id,
    );

    return isDeleted;
  }

  mapperMyCollectionEntityToDto = (
    myCollection: MyCollection,
  ): MyCollectionDto => {
    const myCollectionMapped = myCollection;
    delete myCollectionMapped.user;
    return myCollectionMapped;
  };
}
