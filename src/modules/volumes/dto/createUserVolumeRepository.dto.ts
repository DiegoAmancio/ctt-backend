import { MyCollection } from '@modules/myCollection/infra/database';
import { Volume } from '../infra/database';
import { CreateUserVolumeDTO } from './createUserVolume.dto';

export interface CreateUserVolumeRepositoryDTO
  extends Omit<CreateUserVolumeDTO, 'volume' | 'collection'> {
  volume: Volume;
  collection: MyCollection;
}
