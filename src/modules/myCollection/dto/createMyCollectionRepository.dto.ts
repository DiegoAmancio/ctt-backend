import { MyCollection } from '../infra/database';

export type CreateMyCollectionRepository = Omit<
  MyCollection,
  'id' | 'createdAt' | 'updatedAt'
>;
