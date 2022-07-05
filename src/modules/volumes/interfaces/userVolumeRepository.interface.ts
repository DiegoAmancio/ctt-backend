import { User } from '@modules/user/infra/database';
import { UserVolumeDTO, getAllUserVolumeRepositoryDTO } from '../dto';
import { CreateUserVolumeRepositoryDTO } from '../dto/createUserVolumeRepository.dto';
import { UserVolume, Volume } from '../infra/database';

export interface IUserVolumeRepository {
  createUserVolume(data: CreateUserVolumeRepositoryDTO): Promise<UserVolume>;
  getUserVolume(id: string): Promise<UserVolume>;
  updateUserVolume(data: UserVolumeDTO): Promise<boolean>;
  deleteUserVolume(volume: Volume, user: User): Promise<boolean>;
  getAllUserVolume(data: getAllUserVolumeRepositoryDTO): Promise<UserVolume[]>;
  getUserVolumeByVolume(user: User, volume: Volume): Promise<UserVolume[]>;
}
