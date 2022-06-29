import { CreateUserVolumeDTO } from './createUserVolume.dto';

export interface UpdateUserVolumeDTO extends CreateUserVolumeDTO {
  id: string;
}
