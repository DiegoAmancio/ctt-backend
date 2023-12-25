import { LiteraryWork } from '@infrastructure/database/model';
import { Volume } from '@modules/volumes/infra/database';
import { CreateInternationalizationDTO } from './createInternationalization';

export interface CreateInternationalizationDTORepository
  extends Omit<CreateInternationalizationDTO, 'literaryWork' | 'volume'> {
  literaryWork?: LiteraryWork;
  volume?: Volume;
}
