import { getAllUserVolumeRepositoryDTO } from '@domain/userVolume/dto';
import { CreateUserVolumeRepositoryDTO } from '@domain/userVolume/dto/createUserVolumeRepository';
import { UserVolumeRepositoryImpl } from '@domain/userVolume/interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserVolume, User, Volume } from '../model';

@Injectable()
export class UserVolumeRepository implements UserVolumeRepositoryImpl {
  private readonly repository: Repository<UserVolume>;
  private readonly logger = new Logger(UserVolumeRepository.name);

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserVolume);
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
