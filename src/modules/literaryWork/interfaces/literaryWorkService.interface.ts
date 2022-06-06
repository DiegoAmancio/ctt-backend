import {
  LiteraryWorkDto,
  CreateLiteraryWorkDTO,
  UpdateLiteraryWorkDTO,
} from '../dto';

export interface ILiteraryWorkService {
  createLiteraryWork(data: CreateLiteraryWorkDTO): Promise<LiteraryWorkDto>;
  getLiteraryWork(id: string): Promise<LiteraryWorkDto>;
  updateLiteraryWork(data: UpdateLiteraryWorkDTO): Promise<string>;
  deleteLiteraryWork(data: string): Promise<boolean>;
}
