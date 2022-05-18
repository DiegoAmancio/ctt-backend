import { User } from '../infra/database';
import {
  CreateUserDTO,
  UpdateUserDTO,
  DeleteUserDTO,
  UserTokenDTO,
} from '../Dto';

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User>;
  getUser(userId: string): Promise<User>;
  updateUser(
    updateUserData: UpdateUserDTO,
    userTokenData?: UserTokenDTO,
  ): Promise<string>;
  deleteUser(userId: string): Promise<boolean>;
}
