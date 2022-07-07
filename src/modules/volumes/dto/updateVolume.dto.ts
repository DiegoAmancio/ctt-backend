import { CreateVolumeDTO } from './createVolume.dto';

export interface UpdateVolumeDTO extends CreateVolumeDTO {
  id: string;
  adminId: string;
}
