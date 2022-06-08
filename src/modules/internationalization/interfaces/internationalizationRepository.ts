import { LiteraryWorkDto } from '@modules/literaryWork/dto';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Language } from '@shared/enum';
import {  CreateInternationalizationDTORepository, InternationalizationDto } from '../dto';
import { Internationalization } from '../infra/database';

export interface InternationalizationRepositoryInterface {
  createAndSaveInternationalization(
    data: CreateInternationalizationDTORepository,
  ): Promise<Internationalization>;
  updateInternationalization(data: InternationalizationDto): Promise<boolean>;
  deleteInternationalization(id: string): Promise<boolean>;
  getInternationalization(id: string): Promise<Internationalization>;
  getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWorkDto,
    language: Language,
  ): Promise<InternationalizationDto>;
}
