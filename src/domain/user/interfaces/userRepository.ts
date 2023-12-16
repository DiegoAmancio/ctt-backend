import { User } from '@infrastructure/database/model';
import { UpdateUserDTO, UserDTO } from '../dto';

export interface UserRepositoryImp {
  createAndSaveUser({
    id,
    email,
    name,
  }: {
    id: string;
    email: string;
    name: string;
  }): Promise<UserDTO>;
  updateUser(data: UpdateUserDTO): Promise<boolean>;
  deleteUser(userId: string): Promise<boolean>;
  getUser(id: string): Promise<User>;
}
