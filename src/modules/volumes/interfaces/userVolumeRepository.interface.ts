import { UserVolumeDTO, getAllUserVolumeDTO } from '../dto';
import { CreateUserVolumeRepositoryDTO } from '../dto/createUserVolumeRepository.dto';
import { UserVolume } from '../infra/database';

export interface IUserVolumeRepository {
  createUserVolume(data: CreateUserVolumeRepositoryDTO): Promise<UserVolume>;
  getUserVolume(id: string): Promise<UserVolume>;
  updateUserVolume(data: UserVolumeDTO): Promise<boolean>;
  deleteUserVolume(data: string): Promise<boolean>;
  getAllUserVolume(data: getAllUserVolumeDTO): Promise<UserVolume[]>;
}
