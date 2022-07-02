import { User } from '@modules/user/infra/database';
import { Volume } from '../infra/database';
import { CreateUserVolumeDTO } from './createUserVolume.dto';

export interface CreateUserVolumeRepositoryDTO
  extends Omit<CreateUserVolumeDTO, 'volume' | 'user'> {
  volume: Volume;
  user: User;
}
