import { User, LiteraryWork } from '@infrastructure/database/model';
import { UpdateVolumeDTO } from './updateVolume.dto';

export interface UpdateVolumeRepository
  extends Omit<UpdateVolumeDTO, 'literaryWork'> {
  registeredBy: User;
  updatedBy: User;
  literaryWork: LiteraryWork;
}
