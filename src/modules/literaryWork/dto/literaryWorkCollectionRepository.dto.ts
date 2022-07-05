import { LiteraryWorkDto } from './literaryWork.dto';

export interface LiteraryWorkDtoCollectionRepository extends LiteraryWorkDto {
  adquiredVolumes: string;
  totalVolumes: string;
}
