import { UserDTO } from '@domain/user/dto';
import { UpdateAuthorDTO } from './';

export interface UpdateAuthorRepository
  extends Omit<UpdateAuthorDTO, 'adminId'> {
  registeredBy: UserDTO;
  updatedBy: UserDTO;
}
