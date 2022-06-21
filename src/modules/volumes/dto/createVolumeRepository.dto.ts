import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { User } from '@modules/user/infra/database';
import { CreateVolumeDTO } from './createVolume.dto';

export interface CreateVolumeRepository
  extends Omit<CreateVolumeDTO, 'literaryWork'> {
  registeredBy: User;
  updatedBy: User;
  literaryWork: LiteraryWork;
}
