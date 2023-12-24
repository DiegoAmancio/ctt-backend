import { UserTokenDTO } from '@domain/user/dto';
import { Language } from '@shared/enum';
import {
  CreateVolumeDTO,
  VolumeDTO,
  UpdateVolumeDTO,
  getAllVolume,
} from '../dto';

export interface IVolumeService {
  createVolume(data: CreateVolumeDTO): Promise<VolumeDTO>;
  getVolume(id: string, language: Language): Promise<VolumeDTO>;
  updateVolume(data: UpdateVolumeDTO): Promise<string>;
  deleteVolume(data: string): Promise<boolean>;
  getAllVolume(data: getAllVolume, user?: UserTokenDTO): Promise<VolumeDTO[]>;
}
