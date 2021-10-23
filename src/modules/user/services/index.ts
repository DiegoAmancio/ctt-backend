import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
  UserTokenDTO,
} from '../Dto';
import { IUserRepository, IUserService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository, User } from '../infra/database';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger('User service');
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async createUser({ email, name, password }: CreateUserDTO): Promise<User> {
    this.logger.log('createUser');
    return this.userRepository.createAndSaveUser(email, name, password);
  }
  async getUser(
    data: { id?: string; email?: string },
    userTokenData?: UserTokenDTO,
  ): Promise<User> {
    const queryData = userTokenData
      ? { id: userTokenData.id, email: userTokenData.email }
      : data;
    this.logger.log('getUser');
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
    this.logger.log('updateUser');

    if (updateUserData.id !== userTokenData.id) {
      throw new UnauthorizedException('You cant update another  user');
    }
    const user = await this.getUser({ id: userTokenData.id });

    const data = Object.assign(user, updateUserData);

    await this.userRepository.updateUser(data);
    return 'User updated';
  }
  async deleteUser(data: DeleteUserDTO): Promise<boolean> {
    this.logger.log('deleteUser');
    const user = await this.getUser(data);

    const isDeleted = await this.userRepository.deleteUser(user);

    return isDeleted;
  }
}
