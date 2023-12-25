import { CreateLiteraryWorkDTO } from './createLiteraryWork';

export interface UpdateLiteraryWorkDTO extends CreateLiteraryWorkDTO {
  id: string;
  adminId: string;
}
