import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { UserTokenDTO } from '../dto/userToken.dto';
import { User } from '../infra/database';

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User>;
  getUser(userId: string): Promise<User>;
  updateUser(
    updateUserData: UpdateUserDTO,
    userTokenData?: UserTokenDTO,
  ): Promise<string>;
  deleteUser(userId: string): Promise<boolean>;
}
