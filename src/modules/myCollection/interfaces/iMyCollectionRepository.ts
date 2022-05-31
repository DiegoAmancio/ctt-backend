import { CreateMyCollectionRepository, MyCollectionDto } from '../dto';
import { MyCollection } from '../infra/database';

export interface IMyCollectionRepository {
  createAndSaveMyCollection(
    data: CreateMyCollectionRepository,
  ): Promise<MyCollection>;
  updateMyCollection(id: string): Promise<boolean>;
  deleteMyCollection(id: string): Promise<boolean>;
  getMyCollection(id: string): Promise<MyCollection>;
}
