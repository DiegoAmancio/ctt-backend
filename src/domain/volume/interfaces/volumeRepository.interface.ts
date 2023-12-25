import { GetAllVolumeDTO } from '@domain/userVolume/dto';
import { Volume, LiteraryWork } from '@infrastructure/database/model';
import { CreateVolumeRepository, UpdateVolumeRepository } from '../dto';

export interface VolumeRepositoryImpl {
  createAndSaveVolume(data: CreateVolumeRepository): Promise<Volume>;
  updateVolume(data: UpdateVolumeRepository): Promise<boolean>;
  deleteVolume(id: string): Promise<boolean>;
  getVolume(id: string): Promise<Volume>;
  getAllVolumeDTO(data: GetAllVolumeDTO): Promise<Volume[]>;
  getAllLiteraryWorkDTOVolumes(
    data: GetAllVolumeDTO,
    literaryWork: LiteraryWork,
  ): Promise<Volume[]>;
}
