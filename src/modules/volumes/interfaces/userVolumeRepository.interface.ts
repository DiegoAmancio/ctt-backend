import { User } from '@infrastructure/database/model';
import { getAllUserVolumeRepositoryDTO } from '../dto';
import { CreateUserVolumeRepositoryDTO } from '../dto/createUserVolumeRepository.dto';
import { UserVolume, Volume } from '../infra/database';

export interface IUserVolumeRepository {
  createUserVolume(data: CreateUserVolumeRepositoryDTO): Promise<UserVolume>;
  getUserVolume(id: string): Promise<UserVolume>;
  updateUserVolume(data: UserVolume): Promise<boolean>;
  deleteUserVolume(volume: Volume, user: User): Promise<boolean>;
  getAllUserVolume(data: getAllUserVolumeRepositoryDTO): Promise<UserVolume[]>;
  getUserVolumeByVolume(user: User, volume: Volume): Promise<UserVolume[]>;
  getUserVolumeidsByVolume(user: User, volume: Volume): Promise<UserVolume[]>;
}
