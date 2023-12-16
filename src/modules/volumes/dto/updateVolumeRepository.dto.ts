import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { User } from '@infrastructure/database/model';
import { UpdateVolumeDTO } from '.';

export interface UpdateVolumeRepository
  extends Omit<UpdateVolumeDTO, 'literaryWork'> {
  registeredBy: User;
  updatedBy: User;
  literaryWork: LiteraryWork;
}
