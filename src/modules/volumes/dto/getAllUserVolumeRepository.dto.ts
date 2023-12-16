import { User } from '@infrastructure/database/model';
import { getAllUserVolumeDTO } from './getAllUserVolume.dto';

export interface getAllUserVolumeRepositoryDTO
  extends Omit<getAllUserVolumeDTO, 'user'> {
  user: User;
}
