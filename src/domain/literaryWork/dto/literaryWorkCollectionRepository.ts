import { LiteraryWorkDTO } from './literaryWork';

export interface LiteraryWorkDTOCollectionRepository extends LiteraryWorkDTO {
  adquiredVolumes: string;
  totalVolumes: string;
}
