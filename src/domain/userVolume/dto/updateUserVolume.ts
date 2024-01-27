import { CreateUserVolumeDTO } from './createUserVolume';

export interface UpdateUserVolumeDTO
  extends Omit<CreateUserVolumeDTO, 'volume'> {
  id: string;
}
