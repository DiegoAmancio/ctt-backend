import { Language } from '@shared/enum';
import {
  LiteraryWorkDTO,
  CreateLiteraryWorkDTO,
  UpdateLiteraryWorkDTO,
  getAllLiteraryWorkDTO,
  GetUserLiteraryWorksDTO,
  GetLiteraryWorkDTO,
} from '../dto';

export interface LiteraryWorkServiceImpl {
  createLiteraryWork(data: CreateLiteraryWorkDTO): Promise<LiteraryWorkDTO>;
  getLiteraryWork(data: GetLiteraryWorkDTO): Promise<LiteraryWorkDTO>;
  updateLiteraryWork(data: UpdateLiteraryWorkDTO): Promise<string>;
  deleteLiteraryWork(data: string): Promise<boolean>;
  getAllLiteraryWorkDTO(
    data: getAllLiteraryWorkDTO,
  ): Promise<LiteraryWorkDTO[]>;
  getUserLiteraryWorks(
    userId: string,
    language: Language,
  ): Promise<GetUserLiteraryWorksDTO>;
}
