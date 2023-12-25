import { User } from '@infrastructure/database/model';
import { GetAllUserVolumeDTO } from './getAllUserVolume';

export interface getAllUserVolumeRepositoryDTO
  extends Omit<GetAllUserVolumeDTO, 'user'> {
  user: User;
}
