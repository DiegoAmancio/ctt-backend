import { UserVolume } from '@infrastructure/database/model';

export interface getAllUserVolumeRepositoryIdsDTO
  extends Omit<UserVolume, 'user' | 'volume'> {
  user: string;
  volume: string;
}
