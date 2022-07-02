import { DataSource, Repository } from 'typeorm';
import { IUserVolumeRepository } from '@modules/volumes/interfaces';
import { UserVolume } from './userVolume.entity';
import { getAllUserVolumeDTO, UserVolumeDTO } from '@modules/volumes/Dto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserVolumeRepositoryDTO } from '@modules/volumes/dto/createUserVolumeRepository.dto';

@Injectable()
export class UserVolumeRepository implements IUserVolumeRepository {
  private readonly repository: Repository<UserVolume>;
  private readonly logger = new Logger('UserVolume repository');

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserVolume);
  }
  async getAllUserVolume(data: getAllUserVolumeDTO): Promise<UserVolume[]> {
    const volumes = await this.repository.find({
      skip: data.offset,
      take: data.limit,
    });
    return volumes;
  }
  async createUserVolume(
    data: CreateUserVolumeRepositoryDTO,
  ): Promise<UserVolume> {
    this.logger.log('createUserVolume: ' + JSON.stringify(data));

    const userVolume = this.repository.create(data);

    return this.repository.save(userVolume);
  }
  async getUserVolume(id: string): Promise<UserVolume> {
    this.logger.log('getUserVolume: ' + id);

    const uservolume = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['volume'],
    });

    return uservolume;
  }
  async updateUserVolume(data: UserVolumeDTO): Promise<boolean> {
    this.logger.log('updateUserVolume: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteUserVolume(id: string): Promise<boolean> {
    this.logger.log('deleteUserVolume ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
