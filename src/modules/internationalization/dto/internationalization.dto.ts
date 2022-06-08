import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { CreateInternationalizationDTO } from '.';

export interface InternationalizationDto
  extends Omit<CreateInternationalizationDTO, 'literaryWork'> {
  id: string;
  literaryWork: LiteraryWork;
  createdAt: Date;
  updatedAt: Date;
}
