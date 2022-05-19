import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MyCollectionDto } from '../dto';
import { IMyCollectionRepository, IMyCollectionService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { MyCollectionRepository, MyCollection } from '../infra/database';
import { I_USER_SERVICE } from '@shared/utils/constants';
import { IUserService } from '@modules/user/interfaces';

@Injectable()
export class MyCollectionService implements IMyCollectionService {
  private readonly logger = new Logger('MyCollection service');
  constructor(
    @InjectRepository(MyCollectionRepository)
    private readonly MyCollectionRepository: IMyCollectionRepository,
    @Inject(I_USER_SERVICE)
    private readonly userService: IUserService,
  ) {}
  async createMyCollection(userId: string): Promise<MyCollectionDto> {
    this.logger.log('createMyCollection');
    const user = await this.userService.getUser(userId);
    const MyCollectionSaved =
      await this.MyCollectionRepository.createAndSaveMyCollection({
        collectionValue: 0,
        completeLiteraryWorks: 0,
        totalLiteraryWorks: 0,
        user: user,
      });

    return this.mapperMyCollectionEntityToDto(MyCollectionSaved);
  }
  async getMyCollection(id: string): Promise<MyCollectionDto> {
    this.logger.log('getMyCollection' + id);
    const MyCollection = await this.MyCollectionRepository.getMyCollection(id);

    if (!MyCollection) {
      throw new NotFoundException('MyCollection not found');
    }
    return this.mapperMyCollectionEntityToDto(MyCollection);
  }
  async updateMyCollection(id: string): Promise<string> {
    this.logger.log('updateMyCollection');

    await this.MyCollectionRepository.updateMyCollection(id);
    return 'MyCollection updated';
  }
  async deleteMyCollection(MyCollectionId: string): Promise<boolean> {
    this.logger.log('deleteMyCollection');
    const MyCollection = await this.getMyCollection(MyCollectionId);
    if (!MyCollection) {
      throw new NotFoundException('MyCollection not found');
    }
    const isDeleted = await this.MyCollectionRepository.deleteMyCollection(
      MyCollection.id,
    );

    return isDeleted;
  }

  mapperMyCollectionEntityToDto = (
    myCollection: MyCollection,
  ): MyCollectionDto => {
    let myCollectionMapped = myCollection;
    delete myCollectionMapped.user;
    return myCollectionMapped;
  };
}
