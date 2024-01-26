import { Role } from '@domain/jwt/role.enum';
import { UpdateUserDTO, UserDTO } from '@domain/user/dto';
import { UserRepositoryImp } from '@domain/user/interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from '../model';

@Injectable()
export class UserRepository implements UserRepositoryImp {
  private readonly logger = new Logger('User repository');
  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }
  async createAndSaveUser({
    id,
    email,
    name,
  }: {
    id: string;
    email: string;
    name: string;
  }): Promise<UserDTO> {
    this.logger.log('createAndSaveUser: ' + JSON.stringify({ email, name }));
    const user = this.repository.create({
      id: id,
      email: email,
      name: name,
      role: Role.User,
    });

    const userSaved = await this.repository.save(user);

    return new UserDTO(userSaved);
  }
  async getUser(id: string): Promise<User> {
    this.logger.log('getUser: ' + id);

    const user = await this.repository.findOneBy({ id: id });

    return user;
  }

  async updateUser(data: UpdateUserDTO): Promise<boolean> {
    this.logger.log('updateUser: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteUser(userId: string): Promise<boolean> {
    this.logger.log('deleteUser ' + JSON.stringify(userId));

    const result = await this.repository.delete(userId);
    return result.affected > 0;
  }
}
