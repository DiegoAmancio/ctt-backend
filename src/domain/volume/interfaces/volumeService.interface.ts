import { UserTokenDTO } from '@domain/user/dto';
import { GetAllVolumeDTO } from '@domain/userVolume/dto';
import { Language } from '@shared/enum';
import { CreateVolumeDTO, VolumeDTO, UpdateVolumeDTO } from '../dto';

export interface VolumeServiceImpl {
  createVolume(data: CreateVolumeDTO): Promise<VolumeDTO>;
  getVolume(id: string, language: Language): Promise<VolumeDTO>;
  updateVolume(data: UpdateVolumeDTO): Promise<string>;
  deleteVolume(data: string): Promise<boolean>;
  getAllVolumeDTO(
    data: GetAllVolumeDTO,
    user?: UserTokenDTO,
  ): Promise<VolumeDTO[]>;
}
