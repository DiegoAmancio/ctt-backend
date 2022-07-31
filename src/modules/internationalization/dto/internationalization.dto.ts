import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Volume } from '@modules/volumes/infra/database';
import { Language } from '@shared/enum';
import { CreateInternationalizationDTO } from '.';

export interface InternationalizationDto
  extends Omit<CreateInternationalizationDTO, 'volume' | 'literaryWork'> {
  id: string;
  language: Language;
  synopsis: string;
  literaryWork?: LiteraryWork;
  volume?: Volume;
  createdAt?: Date;
  updatedAt?: Date;
}
