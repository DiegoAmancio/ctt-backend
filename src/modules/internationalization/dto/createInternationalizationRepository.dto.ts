import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { CreateInternationalizationDTO } from './createInternationalization.dto';

export interface CreateInternationalizationDTORepository
  extends Omit<CreateInternationalizationDTO, 'literaryWork'> {
  literaryWork?: LiteraryWork;
}
