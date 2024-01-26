import { GetAllVolumeDTO } from '@domain/userVolume/dto';
import {
  CreateVolumeRepository,
  UpdateVolumeRepository,
} from '@domain/volume/dto';
import { VolumeRepositoryImpl } from '@domain/volume/interfaces';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Volume, LiteraryWork } from '../model';

@Injectable()
export class VolumeRepository implements VolumeRepositoryImpl {
  private readonly repository: Repository<Volume>;
  private readonly logger = new Logger('Volume repository');

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Volume);
  }
  getLastAddedVolumes = (): Promise<Volume[]> =>
    this.repository.find({
      relations: [
        'literaryWork',
        'internationalization',
        'registeredBy',
        'updatedBy',
      ],
      take: Number(process.env.LAST_VOLUMES_LIMIT),
    });

  async getAllVolume(data: GetAllVolumeDTO): Promise<Volume[]> {
    this.logger.log('getAllVolumeDTO: ' + JSON.stringify(data));

    const volumes = await this.repository.find({
      relations: [
        'literaryWork',
        'internationalization',
        'registeredBy',
        'updatedBy',
      ],
      skip: data.offset,
      take: data.limit,
    });
    return volumes;
  }
  async getAllLiteraryWorkVolumes(
    data: GetAllVolumeDTO,
    literaryWork: LiteraryWork,
  ): Promise<Volume[]> {
    this.logger.log('getAllLiteraryWorkVolumes: ' + JSON.stringify(data));

    const Volumes = await this.repository.find({
      where: {
        literaryWork: { id: literaryWork.id },
      },
      relations: ['internationalization', 'registeredBy', 'updatedBy'],
      skip: data.offset,
      take: data.limit,
    });
    return Volumes;
  }
  async getVolume(id: string): Promise<Volume> {
    this.logger.log('getVolume: ' + id);

    const volume = await this.repository.findOne({
      where: { id: id },
      relations: [
        'literaryWork',
        'internationalization',
        'registeredBy',
        'updatedBy',
      ],
    });

    return volume;
  }
  createAndSaveVolume(data: CreateVolumeRepository): Promise<Volume> {
    this.logger.log('createAndSaveVolume: ' + JSON.stringify(data));

    const Volume = this.repository.create(data);

    return this.repository.save(Volume);
  }
  async updateVolume(data: UpdateVolumeRepository): Promise<boolean> {
    this.logger.log('updateVolume: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteVolume(id: string): Promise<boolean> {
    this.logger.log('deleteVolume ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
