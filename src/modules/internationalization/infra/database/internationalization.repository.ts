import { AbstractRepository, EntityRepository } from 'typeorm';
import { InternationalizationRepositoryInterface } from '@modules/internationalization/interfaces';
import { Internationalization } from './internationalization.entity';
import {
  CreateInternationalizationDTO,
  InternationalizationDto,
} from '@modules/internationalization/dto';
import { Logger } from '@nestjs/common';
import { Language } from '@shared/enum';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { LiteraryWorkDto } from '@modules/literaryWork/dto';

@EntityRepository(Internationalization)
export class InternationalizationRepository
  extends AbstractRepository<Internationalization>
  implements InternationalizationRepositoryInterface
{
  async getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWorkDto,
    language: Language,
  ): Promise<InternationalizationDto> {
    this.logger.log('getInternationalization: ' + literaryWork.id);

    const Internationalization = await this.repository.findOne({
      where: { literaryWork: literaryWork, language: language },
    });

    return Internationalization;
  }
  private readonly logger = new Logger('Internationalization repository');

  async getInternationalization(id: string): Promise<Internationalization> {
    this.logger.log('getInternationalization: ' + id);

    const Internationalization = await this.repository.findOne(id);

    return Internationalization;
  }
  createAndSaveInternationalization(
    data: CreateInternationalizationDTO,
  ): Promise<Internationalization> {
    this.logger.log(
      'createAndSaveInternationalization: ' + JSON.stringify(data),
    );
    const Internationalization = this.repository.create(data);

    return this.repository.save(Internationalization);
  }
  async updateInternationalization(
    data: InternationalizationDto,
  ): Promise<boolean> {
    this.logger.log('updateInternationalization: ' + JSON.stringify(data));
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteInternationalization(id: string): Promise<boolean> {
    this.logger.log('deleteInternationalization ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
