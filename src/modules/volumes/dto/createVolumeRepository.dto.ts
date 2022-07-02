import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { User } from '@modules/user/infra/database';
import { Language } from '@shared/enum';
import { CreateVolumeDTO } from './createVolume.dto';

export interface CreateVolumeRepository
  extends Omit<CreateVolumeDTO, 'literaryWork'> {
  language: Language;
  registeredBy: User;
  updatedBy: User;
  literaryWork: LiteraryWork;
}
