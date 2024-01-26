import { CreateUserDTO, UpdateUserDTO, UserDTO, UserTokenDTO } from '../dto';

export interface UserServiceImp {
  createUser(data: CreateUserDTO): Promise<UserDTO>;
  getUser(userId: string): Promise<UserDTO>;
  updateUser(
    updateUserData: UpdateUserDTO,
    userTokenData?: UserTokenDTO,
  ): Promise<string>;
  deleteUser(userId: string): Promise<boolean>;
}
