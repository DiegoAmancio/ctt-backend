import { LiteraryWork } from '@infrastructure/database/model';
import { Volume } from '@modules/volumes/infra/database';
import { CreateInternationalizationDTO } from '.';

export interface InternationalizationDTO
  extends Omit<CreateInternationalizationDTO, 'volume' | 'literaryWork'> {
  id: string;
  literaryWork?: LiteraryWork;
  volume?: Volume;
  createdAt: Date;
  updatedAt: Date;
}
