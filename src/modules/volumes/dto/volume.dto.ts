import { Edition } from '@shared/enum';
import { Volume } from '../infra/database';

export interface VolumeDto
  extends Omit<Volume, 'registeredBy' | 'updatedBy' | 'internationalization'> {
  registeredBy: string;
  name: string;
  updatedBy: string;
  synopsis: string;
  type: string;
  edition: Edition;
  country: string;
  categories: string;
  haveVolume?: boolean;
  purchasedPrice?: string;
  purchasedDate?: Date;
}
