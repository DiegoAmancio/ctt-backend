import { UserVolume } from '../infra/database';

export interface getAllUserVolumeRepositoryIdsDTO
  extends Omit<UserVolume, 'user' | 'volume'> {
  user: string;
  volume: string;
}
