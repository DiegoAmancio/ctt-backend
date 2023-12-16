import { User } from '@infrastructure/database/model';
import { Volume } from '../infra/database';
import { CreateUserVolumeDTO } from './createUserVolume.dto';

export interface CreateUserVolumeRepositoryDTO
  extends Omit<CreateUserVolumeDTO, 'volume' | 'user'> {
  volume: Volume;
  user: User;
}
