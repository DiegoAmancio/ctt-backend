import {
  CreateLiteraryWorkRepository,
  UpdateLiteraryWorkRepository,
} from '../dto';
import { LiteraryWork } from '../infra/database';

export interface ILiteraryWorkRepository {
  createAndSaveLiteraryWork(
    data: CreateLiteraryWorkRepository,
  ): Promise<LiteraryWork>;
  updateLiteraryWork(data: UpdateLiteraryWorkRepository): Promise<boolean>;
  deleteLiteraryWork(id: string): Promise<boolean>;
  getLiteraryWork(id: string): Promise<LiteraryWork>;
}
