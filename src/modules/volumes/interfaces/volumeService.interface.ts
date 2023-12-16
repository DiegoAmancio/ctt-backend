import { UserTokenDTO } from '@domain/user/dto';
import { Language } from '@shared/enum';
import {
  CreateVolumeDTO,
  VolumeDto,
  UpdateVolumeDTO,
  getAllVolume,
} from '../dto';

export interface IVolumeService {
  createVolume(data: CreateVolumeDTO): Promise<VolumeDto>;
  getVolume(id: string, language: Language): Promise<VolumeDto>;
  updateVolume(data: UpdateVolumeDTO): Promise<string>;
  deleteVolume(data: string): Promise<boolean>;
  getAllVolume(data: getAllVolume, user?: UserTokenDTO): Promise<VolumeDto[]>;
}
