import { User } from '../infra/database';
import { CreateUserDTO, UpdateUserDTO, UserTokenDTO } from '../dto';

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User>;
  getUser(userId: string): Promise<User>;
  updateUser(
    updateUserData: UpdateUserDTO,
    userTokenData?: UserTokenDTO,
  ): Promise<string>;
  deleteUser(userId: string): Promise<boolean>;
}
