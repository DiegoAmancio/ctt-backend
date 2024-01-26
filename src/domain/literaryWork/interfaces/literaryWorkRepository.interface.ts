import { Language } from '@shared/enum';
import {
  CreateLiteraryWorkRepository,
  UpdateLiteraryWorkRepository,
  getAllLiteraryWorkDTO,
  LiteraryWorkDTOCollectionRepository,
} from '../dto';
import { LiteraryWork } from '@infrastructure/database/model';

export interface ILiteraryWorkRepository {
  createAndSaveLiteraryWork(
    data: CreateLiteraryWorkRepository,
  ): Promise<LiteraryWork>;
  updateLiteraryWork(data: UpdateLiteraryWorkRepository): Promise<boolean>;
  deleteLiteraryWork(id: string): Promise<boolean>;
  getLiteraryWork(id: string): Promise<LiteraryWork>;
  getAllLiteraryWork(data: getAllLiteraryWorkDTO): Promise<LiteraryWork[]>;
  getUserLiteraryWorks(
    userId: string,
    language: Language,
  ): Promise<LiteraryWorkDTOCollectionRepository[]>;
}
