import { User } from '@modules/user/infra/database';
import { getAllUserVolumeDTO } from './getAllUserVolume.dto';

export interface getAllUserVolumeRepositoryDTO
  extends Omit<getAllUserVolumeDTO, 'user'> {
  user: User;
  relations?: string[];
}
