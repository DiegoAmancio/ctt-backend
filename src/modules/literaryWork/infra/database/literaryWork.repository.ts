import { AbstractRepository, EntityRepository } from 'typeorm';
import { ILiteraryWorkRepository } from '@modules/LiteraryWork/interfaces';
import { LiteraryWork } from './literaryWork.entity';
import {
  CreateLiteraryWorkRepository,
  UpdateLiteraryWorkRepository,
} from '@modules/LiteraryWork/Dto';
import { Logger } from '@nestjs/common';

@EntityRepository(LiteraryWork)
export class LiteraryWorkRepository
  extends AbstractRepository<LiteraryWork>
  implements ILiteraryWorkRepository
{
  private readonly logger = new Logger('LiteraryWork repository');

  async getLiteraryWork(id: string): Promise<LiteraryWork> {
    this.logger.log('getLiteraryWork: ' + id);

    const LiteraryWork = await this.repository.findOne(id);

    return LiteraryWork;
  }
  createAndSaveLiteraryWork(
    data: CreateLiteraryWorkRepository,
  ): Promise<LiteraryWork> {
    this.logger.log('createAndSaveLiteraryWork: ' + JSON.stringify(data));
    const LiteraryWork = this.repository.create(data);
    this.logger.log(
      'createAndSaveLiteraryWork: ' + JSON.stringify(LiteraryWork),
    );

    return this.repository.save(LiteraryWork);
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
