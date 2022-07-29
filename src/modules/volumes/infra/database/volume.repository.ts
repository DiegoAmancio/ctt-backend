import { DataSource, Repository } from 'typeorm';
import { IVolumeRepository } from '@modules/volumes/interfaces';
import { Volume } from './volume.entity';
import {
  CreateVolumeRepository,
  getAllVolume,
  UpdateVolumeRepository,
} from '@modules/volumes/dto';
import { Injectable, Logger } from '@nestjs/common';
import { LiteraryWork } from '@modules/literaryWork/infra/database';

@Injectable()
export class VolumeRepository implements IVolumeRepository {
  private readonly repository: Repository<Volume>;
  private readonly logger = new Logger('Volume repository');

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Volume);
  }
  async getAllVolume(data: getAllVolume): Promise<Volume[]> {
    this.logger.log('getAllVolume: ' + JSON.stringify(data));

    const volumes = await this.repository.find({
      relations: [
        'literaryWork',
        'internationalization',
        'registeredBy',
        'updatedBy',
        'userVolumes',
      ],
      skip: data.offset,
      take: data.limit,
    });
    return volumes;
  }
  async getAllLiteraryWorkVolumes(
    data: getAllVolume,
    literaryWork: LiteraryWork,
  ): Promise<Volume[]> {
    this.logger.log('getAllLiteraryWorkVolumes: ' + JSON.stringify(data));

    const Volumes = await this.repository.find({
      where: {
        literaryWork: { id: literaryWork.id },
      },
      relations: [
        'internationalization',
        'registeredBy',
        'updatedBy',
        'userVolumes',
      ],
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
        'userVolumes',
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
