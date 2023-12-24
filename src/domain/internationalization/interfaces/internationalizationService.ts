import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Language } from '@shared/enum';
import { InternationalizationDTO, CreateInternationalizationDTO } from '../dto';
import { UpdateInternationalizationDTO } from '../dto/updateInternationalization';

export interface InternationalizationServiceImpl {
  createInternationalization(
    data: CreateInternationalizationDTO,
  ): Promise<InternationalizationDTO>;
  getInternationalization(id: string): Promise<InternationalizationDTO>;
  getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWork,
    language: Language,
  ): Promise<InternationalizationDTO>;
  updateInternationalization(
    data: UpdateInternationalizationDTO,
  ): Promise<string>;
  deleteInternationalization(data: string): Promise<boolean>;
}
