import { Coin } from '@shared/enum';
import {
  UserVolumeDTO,
  CreateUserVolumeDTO,
  GetAllUserVolumeDTO,
  UpdateUserVolumeDTO,
} from '../dto';

export interface UserVolumeServiceImpl {
  getAllUserVolume(data: GetAllUserVolumeDTO): Promise<UserVolumeDTO[]>;
  createUserVolume(data: CreateUserVolumeDTO): Promise<UserVolumeDTO>;
  getUserVolume(id: string): Promise<UserVolumeDTO>;
  updateUserVolume(data: UpdateUserVolumeDTO): Promise<string>;
  deleteUserVolume(volumeId: string, userId: string): Promise<boolean>;
  getCollectionValue(userId: string, coinUnit: Coin): Promise<string>;
}
