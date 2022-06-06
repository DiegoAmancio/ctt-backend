import { User } from '@modules/user/infra/database';
import { CreateLiteraryWorkDTO } from './createLiteraryWork.dto';

export interface CreateLiteraryWorkRepository extends CreateLiteraryWorkDTO {
  registeredBy: User;
  updatedBy: User;
}
