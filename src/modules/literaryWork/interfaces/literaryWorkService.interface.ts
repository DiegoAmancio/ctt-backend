import { Language } from '@shared/enum';
import {
  LiteraryWorkDto,
  CreateLiteraryWorkDTO,
  UpdateLiteraryWorkDTO,
  getAllLiteraryWork,
  GetUserLiteraryWorksDTO,
  getAllAuthorLiteraryWork,
} from '../dto';

export interface ILiteraryWorkService {
  createLiteraryWork(data: CreateLiteraryWorkDTO): Promise<LiteraryWorkDto>;
  getLiteraryWork(id: string, language: Language): Promise<LiteraryWorkDto>;
  getAllAuthorLiteraryWork(
    data: getAllAuthorLiteraryWork,
  ): Promise<LiteraryWorkDto[]>;
  updateLiteraryWork(data: UpdateLiteraryWorkDTO): Promise<string>;
  deleteLiteraryWork(data: string): Promise<boolean>;
  getAllLiteraryWork(data: getAllLiteraryWork): Promise<LiteraryWorkDto[]>;
  getUserLiteraryWorks(
    userId: string,
    language: Language,
  ): Promise<GetUserLiteraryWorksDTO>;
}
