import { Edition } from '@shared/enum';

export interface LiteraryWorkDtoCollectionRepository {
  id: string;
  name: string;
  imageUrl: string;
  publisher: string;
  edition: Edition;
  adquiredVolumes: string;
  totalVolumes: string;
}
