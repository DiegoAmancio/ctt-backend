import { LiteraryWork, Volume } from '@infrastructure/database/model';
import { CreateInternationalizationDTO } from './createInternationalization';

export interface CreateInternationalizationDTORepository
  extends Omit<CreateInternationalizationDTO, 'literaryWork' | 'volume'> {
  literaryWork?: LiteraryWork;
  volume?: Volume;
}
