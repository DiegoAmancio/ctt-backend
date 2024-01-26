import { UserVolume, Volume, User } from '@infrastructure/database/model';
import { getAllUserVolumeRepositoryDTO } from '../dto';
import { CreateUserVolumeRepositoryDTO } from '../dto/createUserVolumeRepository';

export interface UserVolumeRepositoryImpl {
  createUserVolume(data: CreateUserVolumeRepositoryDTO): Promise<UserVolume>;
  getUserVolume(id: string): Promise<UserVolume>;
  updateUserVolume(data: UserVolume): Promise<boolean>;
  deleteUserVolume(volumeId: string, userId: string): Promise<boolean>;
  getAllUserVolume(data: getAllUserVolumeRepositoryDTO): Promise<UserVolume[]>;
  getUserVolumeByVolume(user: User, volume: Volume): Promise<UserVolume[]>;
  getUserVolumeidsByVolume(user: User, volume: Volume): Promise<UserVolume[]>;
}
