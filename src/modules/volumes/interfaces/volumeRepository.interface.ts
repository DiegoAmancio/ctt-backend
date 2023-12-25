import { LiteraryWork } from '@infrastructure/database/model';
import {
  CreateVolumeRepository,
  UpdateVolumeRepository,
  getAllVolume,
} from '../dto';
import { Volume } from '../infra/database';

export interface IVolumeRepository {
  createAndSaveVolume(data: CreateVolumeRepository): Promise<Volume>;
  updateVolume(data: UpdateVolumeRepository): Promise<boolean>;
  deleteVolume(id: string): Promise<boolean>;
  getVolume(id: string): Promise<Volume>;
  getAllVolume(data: getAllVolume): Promise<Volume[]>;
  getAllLiteraryWorkDTOVolumes(
    data: getAllVolume,
    literaryWork: LiteraryWork,
  ): Promise<Volume[]>;
}
