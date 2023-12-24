import { Language } from '@shared/enum';
import {
  LiteraryWorkDTO,
  CreateLiteraryWorkDTO,
  UpdateLiteraryWorkDTO,
  getAllLiteraryWork,
  GetUserLiteraryWorksDTO,
} from '../dto';

export interface ILiteraryWorkService {
  createLiteraryWork(data: CreateLiteraryWorkDTO): Promise<LiteraryWorkDTO>;
  getLiteraryWork(id: string, language: Language): Promise<LiteraryWorkDTO>;
  updateLiteraryWork(data: UpdateLiteraryWorkDTO): Promise<string>;
  deleteLiteraryWork(data: string): Promise<boolean>;
  getAllLiteraryWork(data: getAllLiteraryWork): Promise<LiteraryWorkDTO[]>;
  getUserLiteraryWorks(
    userId: string,
    language: Language,
  ): Promise<GetUserLiteraryWorksDTO>;
}
