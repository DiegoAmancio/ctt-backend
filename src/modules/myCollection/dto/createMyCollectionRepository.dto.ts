import { MyCollection } from '../infra/database';

export interface CreateMyCollectionRepository
  extends Omit<MyCollection, 'id' | 'createdAt' | 'updatedAt'> {}
