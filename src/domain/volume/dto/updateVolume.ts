import { CreateVolumeDTO } from './createVolume';

export interface UpdateVolumeDTO extends CreateVolumeDTO {
  id: string;
  adminId: string;
}
