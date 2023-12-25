import { Coin } from '@shared/enum';

export interface CreateUserVolumeDTO {
  purchasedPrice?: number;
  purchasedDate: Date;
  purchasedPriceUnit?: Coin;
  volume: string;
  user?: string;
}
