import { LiteraryWork, User } from '@infrastructure/database/model';
import { Language } from '@shared/enum';
import { CreateVolumeDTO } from './createVolume';

export interface CreateVolumeRepository
  extends Omit<CreateVolumeDTO, 'literaryWork'> {
  language: Language;
  registeredBy: User;
  updatedBy: User;
  literaryWork: LiteraryWork;
}
