import {
  CreateUserDTO,
  UpdateUserDTO,
  UserDTO,
  UserTokenDTO,
} from '@domain/user/dto';
import { UserServiceImp, UserRepositoryImp } from '@domain/user/interfaces';
import {
  Injectable,
  Logger,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '@shared/utils/constants';

@Injectable()
export class UserService implements UserServiceImp {
  private readonly logger = new Logger('User service');
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryImp,
  ) {}
  async createUser({ id, email, name }: CreateUserDTO): Promise<UserDTO> {
    this.logger.log('createUser');
    const user = await this.userRepository.createAndSaveUser({
      id,
      email,
      name,
    });

    return user;
  }
  async getUser(userId: string): Promise<UserDTO> {
    this.logger.log('getUser ' + userId);
    const user = await this.userRepository.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserDTO(user);
  }
  async updateUser(
    updateUserData: UpdateUserDTO,
    userTokenData: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('updateUser');

    if (updateUserData.id !== userTokenData.id) {
      throw new UnauthorizedException('You cant update another  user');
    }
    const user = await this.getUser(userTokenData.id);

    const data = Object.assign(user, updateUserData);

    await this.userRepository.updateUser(data);
    return 'User updated';
  }
  async deleteUser(userId: string): Promise<boolean> {
    this.logger.log('deleteUser');
    const user = await this.getUser(userId);

    const isDeleted = await this.userRepository.deleteUser(user.id);

    return isDeleted;
  }
}
