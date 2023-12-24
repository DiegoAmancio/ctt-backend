import { LiteraryWorkDTO } from './literaryWork.dto';

export interface LiteraryWorkDTOCollectionRepository extends LiteraryWorkDTO {
  adquiredVolumes: string;
  totalVolumes: string;
}
