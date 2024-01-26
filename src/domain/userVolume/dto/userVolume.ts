import { Coin } from '@shared/enum';
import { CreateUserVolumeRepositoryDTO } from './createUserVolumeRepository';

export interface UserVolumeDTO
  extends Omit<CreateUserVolumeRepositoryDTO, 'user' | 'purchasedPrice'> {
  id: string;
  purchasedPrice: number;
  purchasedPriceUnit: Coin;
  createdAt: Date;
  updatedAt: Date;
}
