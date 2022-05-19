import { MyCollectionDto } from '../dto';

export interface IMyCollectionService {
  createMyCollection(userId: string): Promise<MyCollectionDto>;
  getMyCollection(userId: string): Promise<MyCollectionDto>;
  updateMyCollection(userId: string): Promise<string>;
  deleteMyCollection(userId: string): Promise<boolean>;
}
