import { IUserRepository } from '@modules/user/interfaces/iUserRepository';
import { User } from './user.entity';
import { UpdateUserDTO } from '@modules/user/dto';
import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@modules/auth/jwt/role.enum';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly logger = new Logger('User repository');
  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }
  async getUser(id: string): Promise<User> {
    this.logger.log('getUser: ' + id);

    const user = await this.repository.findOneBy({ id: id });

    return user;
  }
  createAndSaveUser({
    id,
    email,
    name,
  }: {
    id: string;
    email: string;
    name: string;
  }): Promise<User> {
    this.logger.log('createAndSaveUser: ' + JSON.stringify({ email, name }));
    const user = this.repository.create({
      id: id,
      email: email,
      name: name,
      role: Role.User,
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

    const result = await this.repository.delete(user.id);
    return result.affected > 0;
  }
}
