import { AbstractRepository, EntityRepository } from 'typeorm';
import { IUserRepository } from '@modules/user/interfaces/iUserRepository';
import { User } from './user.entity';
import { UpdateUserDTO } from '@modules/user/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository
  extends AbstractRepository<User>
  implements IUserRepository
{
  private readonly logger = new Logger('User repository');

  findUserByProp(data: {
    email?: string;
    id?: string;
    name?: string;
  }): Promise<User> {
    this.logger.log('findUserByProp: ' + JSON.stringify(data));

    const user = this.repository.findOne(data);

    return user;
  }
  createAndSaveUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    this.logger.log('createAndSaveUser: ' + JSON.stringify({ email, name }));
    const user = this.repository.create({
      email: email,
      name: name,
      password: password,
    });

    return this.repository.save(user);
  }
  async updateUser(data: UpdateUserDTO): Promise<boolean> {
    this.logger.log('updateUser: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteUser(user: User): Promise<boolean> {
    this.logger.log('deleteUser ' + JSON.stringify(user));

    const result = await this.repository.delete(user);
    return result.affected > 0;
  }
}
