import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../infra/typeorm/user.entity';
import {
  CreateUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
  UserTokenDTO,
} from '../Dto';
import { IUserRepository, IUserService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../infra/typeorm/user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async createUser({ email, name, password }: CreateUserDTO): Promise<User> {
    return this.userRepository.createAndSaveUser(email, name, password);
  }
  async getUser(
    data: { id?: string; email?: string },
    userTokenData?: UserTokenDTO,
  ): Promise<User> {
    const queryData = userTokenData
      ? { id: userTokenData.id, email: userTokenData.email }
      : data;
    const user = this.userRepository.findUserByProp(queryData);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async updateUser(
    updateUserData: UpdateUserDTO,
    userTokenData: UserTokenDTO,
  ): Promise<string> {
    if (updateUserData.id !== userTokenData.id) {
      throw new UnauthorizedException('You cant update another  user');
    }
    const user = await this.getUser({ id: userTokenData.id });

    const data = Object.assign(user, updateUserData);

    await this.userRepository.updateUser(data);
    return 'User updated';
  }
  async deleteUser(data: DeleteUserDTO): Promise<boolean> {
    const user = await this.getUser(data);

    const isDeleted = await this.userRepository.deleteUser(user);

    return isDeleted;
  }
}
