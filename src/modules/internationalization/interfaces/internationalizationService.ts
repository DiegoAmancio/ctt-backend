import { LiteraryWorkDto } from '@modules/literaryWork/dto';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Language } from '@shared/enum';
import { InternationalizationDto, CreateInternationalizationDTO } from '../dto';
import { UpdateInternationalizationDto } from '../dto/updateInternationalization.dto';

export interface InternationalizationServiceInterface {
  createInternationalization(
    data: CreateInternationalizationDTO,
  ): Promise<InternationalizationDto>;
  getInternationalization(id: string): Promise<InternationalizationDto>;
  getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWorkDto,
    language: Language,
  ): Promise<InternationalizationDto>;
  updateInternationalization(
    data: UpdateInternationalizationDto,
  ): Promise<string>;
  deleteInternationalization(data: string): Promise<boolean>;
}
