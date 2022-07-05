import {
  UserVolumeDTO,
  CreateUserVolumeDTO,
  getAllUserVolumeDTO,
  UpdateUserVolumeDTO,
} from '../dto';

export interface IUserVolumeService {
  getAllUserVolume(data: getAllUserVolumeDTO): Promise<UserVolumeDTO[]>;
  createUserVolume(data: CreateUserVolumeDTO): Promise<UserVolumeDTO>;
  getUserVolume(id: string): Promise<UserVolumeDTO>;
  updateUserVolume(data: UpdateUserVolumeDTO): Promise<string>;
  deleteUserVolume(volumeId: string, userId: string): Promise<boolean>;
}
