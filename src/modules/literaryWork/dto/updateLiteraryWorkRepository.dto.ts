import { User } from '@modules/user/infra/database';
import { UpdateLiteraryWorkDTO } from '.';

export interface UpdateLiteraryWorkRepository extends UpdateLiteraryWorkDTO {
  registeredBy: User;
  updatedBy: User;
}
