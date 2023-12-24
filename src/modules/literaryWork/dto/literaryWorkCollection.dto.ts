import { Status } from '@shared/enum';
import { LiteraryWorkDTOCollectionRepository } from './literaryWorkCollectionRepository.dto';

export interface LiteraryWorkDTOCollection
  extends Omit<
    LiteraryWorkDTOCollectionRepository,
    'adquiredVolumes' | 'totalVolumes'
  > {
  adquiredVolumes: number;
  totalVolumes: number;
  status: Status;
}
export interface GetUserLiteraryWorksDTO {
  literaryWorks: LiteraryWorkDTOCollection[];
  totalVolumes: number;
  completeLiteraryWorks: number;
  totalLiteraryWorks: number;
  memberSince: Date;
}
