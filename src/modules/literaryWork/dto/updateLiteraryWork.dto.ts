import { CreateLiteraryWorkDTO } from './createLiteraryWork.dto';

export interface UpdateLiteraryWorkDTO extends CreateLiteraryWorkDTO {
  id: string;
  adminId: string;
}
