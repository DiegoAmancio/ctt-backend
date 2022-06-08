import { Language } from '@shared/enum';
import {
  LiteraryWorkDto,
  CreateLiteraryWorkDTO,
  UpdateLiteraryWorkDTO,
  getAllLiteraryWork,
} from '../dto';

export interface ILiteraryWorkService {
  createLiteraryWork(data: CreateLiteraryWorkDTO): Promise<LiteraryWorkDto>;
  getLiteraryWork(id: string, language: Language): Promise<LiteraryWorkDto>;
  updateLiteraryWork(data: UpdateLiteraryWorkDTO): Promise<string>;
  deleteLiteraryWork(data: string): Promise<boolean>;
  getAllLiteraryWork(data: getAllLiteraryWork): Promise<LiteraryWorkDto[]>;
}
