import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { User } from '@modules/user/infra/database';
import { UpdateVolumeDTO } from '.';

export interface UpdateVolumeRepository
  extends Omit<UpdateVolumeDTO, 'literaryWork'> {
  registeredBy: User;
  updatedBy: User;
  literaryWork: LiteraryWork;
}
