import { GetAllVolumeDTO } from '@domain/userVolume/dto';
import { LiteraryWork, Volume } from '@infrastructure/database/model';
import { CreateVolumeRepository, UpdateVolumeRepository } from '../dto';

export interface VolumeRepositoryImpl {
  getLastAddedVolumes(): Promise<Volume[]>;
  createAndSaveVolume(data: CreateVolumeRepository): Promise<Volume>;
  updateVolume(data: UpdateVolumeRepository): Promise<boolean>;
  deleteVolume(id: string): Promise<boolean>;
  getVolume(id: string): Promise<Volume>;
  getAllVolume(data: GetAllVolumeDTO): Promise<Volume[]>;
  getAllLiteraryWorkVolumes(
    data: GetAllVolumeDTO,
    literaryWork: LiteraryWork,
  ): Promise<Volume[]>;
}
