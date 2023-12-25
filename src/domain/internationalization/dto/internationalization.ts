import { LiteraryWork, Volume } from '@infrastructure/database/model';
import { CreateInternationalizationDTO } from './createInternationalization';

export interface InternationalizationDTO
  extends Omit<CreateInternationalizationDTO, 'volume' | 'literaryWork'> {
  id: string;
  literaryWork?: LiteraryWork;
  volume?: Volume;
  createdAt: Date;
  updatedAt: Date;
}
