import { User } from '@modules/user/infra/database';
import { MyCollectionDto } from '../dto';

export interface IMyCollectionService {
  createMyCollection(user: User): Promise<MyCollectionDto>;
  getMyCollection(userId: string): Promise<MyCollectionDto>;
  updateMyCollection(userId: string): Promise<string>;
  deleteMyCollection(userId: string): Promise<boolean>;
}
