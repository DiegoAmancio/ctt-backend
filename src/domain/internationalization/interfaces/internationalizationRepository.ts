import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Language } from '@shared/enum';
import {
  CreateInternationalizationDTORepository,
  InternationalizationDTO,
} from '../dto';
import { Internationalization } from '@infrastructure/database/model/internationalization';

export interface InternationalizationRepositoryImpl {
  createAndSaveInternationalization(
    data: CreateInternationalizationDTORepository,
  ): Promise<Internationalization>;
  updateInternationalization(data: InternationalizationDTO): Promise<boolean>;
  deleteInternationalization(id: string): Promise<boolean>;
  getInternationalization(id: string): Promise<Internationalization>;
  getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWork,
    language: Language,
  ): Promise<InternationalizationDTO>;
}
