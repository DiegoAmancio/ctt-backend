import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Volume } from '@modules/volumes/infra/database';
import { Language } from '@shared/enum';
import {
  CreateInternationalizationDTORepository,
  InternationalizationDto,
} from '../dto';
import { Internationalization } from '../infra/database';

export interface InternationalizationRepositoryInterface {
  createAndSaveInternationalization(
    data: CreateInternationalizationDTORepository,
  ): Promise<Internationalization>;
  updateInternationalization(data: InternationalizationDto): Promise<boolean>;
  deleteInternationalization(id: string): Promise<boolean>;
  getInternationalization(id: string): Promise<Internationalization>;
  getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWork,
    language: Language,
  ): Promise<InternationalizationDto>;
  getInternationalizationByVolume(
    volume: Volume,
    language: Language,
  ): Promise<InternationalizationDto>;
}
