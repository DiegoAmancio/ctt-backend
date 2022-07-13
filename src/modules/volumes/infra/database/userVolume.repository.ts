import { DataSource, In, Repository } from 'typeorm';
import { IUserVolumeRepository } from '@modules/volumes/interfaces';
import { UserVolume } from './userVolume.entity';
import {
  getAllUserVolumeDTO,
  getAllUserVolumeRepositoryDTO,
  getAllUserVolumeRepositoryIdsDTO,
  UserVolumeDTO,
} from '@modules/volumes/Dto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserVolumeRepositoryDTO } from '@modules/volumes/dto/createUserVolumeRepository.dto';
import { User } from '@modules/user/infra/database';
import { Volume } from './volume.entity';

@Injectable()
export class UserVolumeRepository implements IUserVolumeRepository {
  private readonly repository: Repository<UserVolume>;
  private readonly logger = new Logger('UserVolume repository');

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserVolume);
  }
  async getAllUserVolumesByVolumes(
    volumesIds: string[],
  ): Promise<UserVolume[]> {
    const volumes = await this.repository.find({
      where: {
        volume: In(volumesIds),
      },
      relations: ['user'],
    });
    return volumes;
  }
  async getAllUserVolume(
    data: getAllUserVolumeRepositoryDTO,
  ): Promise<UserVolume[]> {
    const volumes = await this.repository.find({
      skip: data.offset,
      take: data.limit,
      where: {
        user: data.user,
      },
      relations: data.relations,
      loadRelationIds: true,
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
  async getUserVolumeByVolume(
    user: User,
    volume: Volume,
  ): Promise<UserVolume[]> {
    this.logger.log('getUserVolume: userId' + user + ' volume ' + volume);

    const userVolume = await this.repository.query(
      `select  DISTINCT ON (uv.id)  
      id,
      uv."purchasedPrice",
      uv."purchasedDate",
      uv."purchasedPriceUnit",
      uv."createdAt",
      uv."updatedAt" 
      from "userVolumes" uv where uv."userId" = '${user.id}' and uv."volumeId" = '${volume.id}'`,
    );

    return userVolume;
  }
  async getUserVolumeidsByVolume(
    user: User,
    volume: Volume,
  ): Promise<UserVolume[]> {
    this.logger.log('getUserVolume: userId' + user + ' volume ' + volume);

    const userVolume = await this.repository.query(
      `Select distinct uv."volumeId", uv."userId" from "userVolumes" uv where uv."userId" = '${user.id}' and uv."volumeId" = '${volume.id}' group by uv."id"`,
    );

    return userVolume;
  }
  async updateUserVolume(data: UserVolume): Promise<boolean> {
    this.logger.log('updateUserVolume: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteUserVolume(volume: Volume, user: User): Promise<boolean> {
    this.logger.log(
      'deleteUserVolume volume: ' + volume.id + ' user: ' + user.id,
    );

    const result = await this.repository.delete({
      volume: volume,
      user: user,
    });
    return result.affected > 0;
  }
}
