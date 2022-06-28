import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MyCollectionDto } from '../dto';
import { IMyCollectionRepository, IMyCollectionService } from '../interfaces';
import { MyCollection } from '../infra/database';

import { User } from '@modules/user/infra/database';
import { I_MY_COLLECTION_REPOSITORY } from '@shared/utils/constants';

@Injectable()
export class MyCollectionService implements IMyCollectionService {
  private readonly logger = new Logger('MyCollection service');
  constructor(
    @Inject(I_MY_COLLECTION_REPOSITORY)
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
    const myCollection = await this.getMyCollection(MyCollectionId);
    if (!myCollection) {
      throw new NotFoundException('MyCollection not found');
    }
    const isDeleted = await this.myCollectionRepository.deleteMyCollection(
      myCollection.id,
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
