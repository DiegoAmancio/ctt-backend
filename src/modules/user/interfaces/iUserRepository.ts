import { UpdateUserDTO } from '../Dto';
import { User } from '../infra/database';

export interface IUserRepository {
  createAndSaveUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User>;
  updateUser(data: UpdateUserDTO): Promise<boolean>;
  deleteUser(data: User): Promise<boolean>;
  findUserByProp(data: {
    email?: string;
    id?: string;
    name?: string;
  }): Promise<User>;
}
