import {
  InternationalizationDTO,
  CreateInternationalizationDTORepository,
} from '@domain/internationalization/dto';
import { InternationalizationRepositoryImpl } from '@domain/internationalization/interfaces';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { Injectable, Logger } from '@nestjs/common';
import { Language } from '@shared/enum';
import { Repository, DataSource } from 'typeorm';
import { Internationalization } from '../model/internationalization';

@Injectable()
export class InternationalizationRepository
  implements InternationalizationRepositoryImpl
{
  private readonly repository: Repository<Internationalization>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Internationalization);
  }
  async getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWork,
    language: Language,
  ): Promise<InternationalizationDTO> {
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
    data: InternationalizationDTO,
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
