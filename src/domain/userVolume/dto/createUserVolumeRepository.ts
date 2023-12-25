import { Volume, User } from '@infrastructure/database/model';
import { CreateUserVolumeDTO } from './createUserVolume';

export interface CreateUserVolumeRepositoryDTO
  extends Omit<CreateUserVolumeDTO, 'volume' | 'user'> {
  volume: Volume;
  user: User;
}
