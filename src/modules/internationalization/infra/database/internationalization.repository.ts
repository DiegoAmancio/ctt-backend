import { DataSource, Repository } from 'typeorm';
import { InternationalizationRepositoryInterface } from '@modules/internationalization/interfaces';
import { Internationalization } from './internationalization.entity';
import {
  CreateInternationalizationDTORepository,
  InternationalizationDto,
} from '@modules/internationalization/dto';
import { Injectable, Logger } from '@nestjs/common';
import { Language } from '@shared/enum';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Volume } from '@modules/volumes/infra/database';

@Injectable()
export class InternationalizationRepository
  implements InternationalizationRepositoryInterface
{
  private readonly repository: Repository<Internationalization>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Internationalization);
  }
  async getInternationalizationByVolume(
    volume: Volume,
    language: Language,
  ): Promise<InternationalizationDto> {
    this.logger.log('getInternationalization: ' + volume.id + ' ' + language);

    const internationalization = await this.repository.query(
      `Select * from internationalizations p where p."volumeId" = '${volume.id}' and p."language" = '${language}'`,
    );

    return internationalization.length === 1 ? internationalization[0] : null;
  }

  async getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWork,
    language: Language,
  ): Promise<InternationalizationDto> {
    this.logger.log('getInternationalization: ' + literaryWork.id);

    const internationalization = await this.repository.findOneBy({
      literaryWork: literaryWork,
      language: language,
    });

    return internationalization;
  }
  private readonly logger = new Logger('Internationalization repository');

  async getInternationalization(id: string): Promise<Internationalization> {
    this.logger.log('getInternationalization: ' + id);

    const internationalization = await this.repository.findOneBy({ id: id });

    return internationalization;
  }
  createAndSaveInternationalization(
    data: CreateInternationalizationDTORepository,
  ): Promise<Internationalization> {
    this.logger.log(
      'createAndSaveInternationalization: ' + JSON.stringify(data),
    );
    const internationalization = this.repository.create(data);

    return this.repository.save(internationalization);
  }
  async updateInternationalization(
    data: InternationalizationDto,
  ): Promise<boolean> {
    this.logger.verbose(
      'updateInternationalization: ' +
        JSON.stringify({
          id: data.id,
          language: data.language,
          synopsis: data.synopsis,
        }),
    );
    const result = await this.repository.update(data.id, data);

    return result.affected > 0;
  }
  async deleteInternationalization(id: string): Promise<boolean> {
    this.logger.log('deleteInternationalization ' + id);

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
