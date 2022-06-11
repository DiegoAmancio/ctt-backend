import { AbstractRepository, EntityRepository } from 'typeorm';
import { ILiteraryWorkRepository } from '@modules/LiteraryWork/interfaces';
import { LiteraryWork } from './literaryWork.entity';
import {
  CreateLiteraryWorkRepository,
  getAllLiteraryWork,
  UpdateLiteraryWorkRepository,
} from '@modules/LiteraryWork/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(LiteraryWork)
export class LiteraryWorkRepository
  extends AbstractRepository<LiteraryWork>
  implements ILiteraryWorkRepository
{
  async getAllLiteraryWork(data: getAllLiteraryWork): Promise<LiteraryWork[]> {
    const literaryWorks = await this.repository.find({
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
    return literaryWorks;
  }
  private readonly logger = new Logger('LiteraryWork repository');

  async getLiteraryWork(id: string): Promise<LiteraryWork> {
    this.logger.log('getLiteraryWork: ' + id);

    const literaryWork = await this.repository.findOne({
      where: { id: id },
      relations: [
        'internationalization',
        'registeredBy',
        'updatedBy',
        'writterBy',
        'ilustratorBy',
      ],
    });

    return literaryWork;
  }
  createAndSaveLiteraryWork(
    data: CreateLiteraryWorkRepository,
  ): Promise<LiteraryWork> {
    this.logger.log('createAndSaveLiteraryWork: ' + JSON.stringify(data));

    const literaryWork = this.repository.create(data);

    return this.repository.save(literaryWork);
  }
  async updateLiteraryWork(
    data: UpdateLiteraryWorkRepository,
  ): Promise<boolean> {
    this.logger.log('updateLiteraryWork: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteLiteraryWork(id: string): Promise<boolean> {
    this.logger.log('deleteLiteraryWork ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
