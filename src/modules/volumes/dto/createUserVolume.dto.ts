import { Coin } from '@shared/enum';

export interface CreateUserVolumeDTO {
  purchasedPrice?: number;
  purchasedDate: Date;
  purchasedPriceUnit?: Coin;
  acquisitionDifficulty?: number;
  userClassification?: number;
  volume: string;
  user: string;
}
