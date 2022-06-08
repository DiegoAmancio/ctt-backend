import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Edition, Language, PaperType, Type } from '@shared/enum';
import { CreateInternationalizationDTO } from './createInternationalization.dto';

export interface CreateInternationalizationDTORepository
  extends Omit<CreateInternationalizationDTO, 'literaryWork'> {
  literaryWork?: LiteraryWork;
}
