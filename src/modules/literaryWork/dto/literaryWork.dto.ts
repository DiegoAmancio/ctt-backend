import { LiteraryWork } from '../infra/database';

export interface LiteraryWorkDto
  extends Omit<LiteraryWork, 'registeredBy' | 'updatedBy'> {
  registeredBy: string;
  updatedBy: string;
}
