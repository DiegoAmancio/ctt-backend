import { Status } from '@shared/enum';
import { LiteraryWorkDtoCollectionRepository } from './literaryWorkCollectionRepository.dto';

export interface LiteraryWorkDtoCollection
  extends Omit<
    LiteraryWorkDtoCollectionRepository,
    'adquiredVolumes' | 'totalVolumes'
  > {
  adquiredVolumes: number;
  totalVolumes: number;
  status: Status;
}
export interface GetUserLiteraryWorksDTO {
  literaryWorks: LiteraryWorkDtoCollection[];
  totalVolumes: number;
  completeLiteraryWorks: number;
  totalLiteraryWorks: number;
  memberSince: Date;
}
