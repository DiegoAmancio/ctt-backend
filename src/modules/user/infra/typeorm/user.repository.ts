import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { IUserRepository } from '@modules/user/interfaces/iUserRepository';
import { User } from './user.entity';
import { UpdateUserDTO } from '@modules/user/Dto';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  findUserByProp(data: {
    email?: string;
    id?: string;
    name?: string;
  }): Promise<User> {
    const user = this.findOne(data);

    return user;
  }

  createAndSaveUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const user = this.create({
      email: email,
      name: name,
      password: password,
    });

    return this.save(user);
  }
  updateUser(data: UpdateUserDTO): Promise<UpdateResult> {
    const user = this.update(data.id, data);

    return user;
  }
  async deleteUser(user: User): Promise<boolean> {
    const deleteUser = await this.delete(user);
    return deleteUser.affected > 0;
  }
}
