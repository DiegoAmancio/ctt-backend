import { UpdateUserDTO } from '../dto';
import { User } from '../infra/database';

export interface IUserRepository {
  createAndSaveUser({
    id,
    email,
    name,
  }: {
    id: string;
    email: string;
    name: string;
  }): Promise<User>;
  updateUser(data: UpdateUserDTO): Promise<boolean>;
  deleteUser(data: User): Promise<boolean>;
  getUser(id: string): Promise<User>;
}
