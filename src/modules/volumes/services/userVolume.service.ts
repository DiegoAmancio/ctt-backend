import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateUserVolumeDTO,
  getAllUserVolumeDTO,
  UpdateUserVolumeDTO,
  UserVolumeDTO,
} from '../dto';
import {
  IVolumeRepository,
  IUserVolumeService,
  IUserVolumeRepository,
} from '../interfaces';
import {
  I_USER_REPOSITORY,
  I_USER_VOLUME_REPOSITORY,
  I_VOLUME_REPOSITORY,
} from '@shared/utils/constants';
import { IUserRepository } from '@modules/user/interfaces';

@Injectable()
export class UserVolumeService implements IUserVolumeService {
  private readonly logger = new Logger('User Volume service');
  constructor(
    @Inject(I_VOLUME_REPOSITORY)
    private readonly volumeRepository: IVolumeRepository,
    @Inject(I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(I_USER_VOLUME_REPOSITORY)
    private readonly userVolumeRepository: IUserVolumeRepository,
  ) {}
  async createUserVolume(data: CreateUserVolumeDTO): Promise<UserVolumeDTO> {
    const user = await this.userRepository.getUser(data.user);
    const volume = await this.volumeRepository.getVolume(data.volume);
    const userVolume = await this.userVolumeRepository.createUserVolume({
      ...data,
      user: user,
      volume: volume,
    });
    return userVolume;
  }
  async getUserVolume(id: string): Promise<UserVolumeDTO> {
    const userVolume = await this.userVolumeRepository.getUserVolume(id);
    return userVolume;
  }
  async updateUserVolume(data: UpdateUserVolumeDTO): Promise<string> {
    const userVolume = await this.userVolumeRepository.getUserVolume(data.id);

    const userVolumeUpdated = Object.assign(userVolume, data);

    await this.userVolumeRepository.updateUserVolume(userVolumeUpdated);
    return 'UserVolume updated';
  }
  async deleteUserVolume(id: string): Promise<boolean> {
    const userVolume = await this.userVolumeRepository.deleteUserVolume(id);
    return userVolume;
  }
  async getAllUserVolume(data: getAllUserVolumeDTO): Promise<UserVolumeDTO[]> {
    const userVolumes = await this.userVolumeRepository.getAllUserVolume(data);
    return userVolumes;
  }
}
