import { AbstractRepository, EntityRepository } from 'typeorm';
import { IVolumeRepository } from '@modules/volumes/interfaces';
import { Volume } from './volume.entity';
import {
  CreateVolumeRepository,
  getAllVolume,
  UpdateVolumeRepository,
} from '@modules/volumes/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(Volume)
export class VolumeRepository
  extends AbstractRepository<Volume>
  implements IVolumeRepository
{
  async getAllVolume(data: getAllVolume): Promise<Volume[]> {
    const Volumes = await this.repository.find({
      relations: [
        'internationalization',
        'registeredBy',
        'updatedBy',
        'writterBy',
        'ilustratorBy',
      ],
      skip: data.offset,
      take: data.limit,
    });
    return Volumes;
  }
  private readonly logger = new Logger('Volume repository');

  async getVolume(id: string): Promise<Volume> {
    this.logger.log('getVolume: ' + id);

    const Volume = await this.repository.findOne({
      where: { id: id },
      relations: [
        'internationalization',
        'registeredBy',
        'updatedBy',
        'writterBy',
        'ilustratorBy',
      ],
    });

    return Volume;
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
