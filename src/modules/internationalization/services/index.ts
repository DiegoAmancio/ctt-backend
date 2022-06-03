import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InternationalizationDto, CreateInternationalizationDTO } from '../dto';
import {
  InternationalizationRepositoryInterface,
  InternationalizationServiceInterface,
} from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import {
  InternationalizationRepository,
  Internationalization,
} from '../infra/database';

@Injectable()
export class InternationalizationService
  implements InternationalizationServiceInterface
{
  private readonly logger = new Logger('Internationalization service');
  constructor(
    @InjectRepository(InternationalizationRepository)
    private readonly internationalizationRepository: InternationalizationRepositoryInterface,
  ) {}
  async createInternationalization(
    data: CreateInternationalizationDTO,
  ): Promise<InternationalizationDto> {
    this.logger.log('createInternationalization');
    const InternationalizationSaved =
      await this.internationalizationRepository.createAndSaveInternationalization(
        data,
      );

    return InternationalizationSaved;
  }
  async getInternationalization(id: string): Promise<InternationalizationDto> {
    this.logger.log('getInternationalization' + id);
    const internationalization =
      await this.internationalizationRepository.getInternationalization(id);

    if (!internationalization) {
      throw new NotFoundException('Internationalization not found');
    }
    return internationalization;
  }
  async updateInternationalization(
    updateInternationalizationData: InternationalizationDto,
  ): Promise<string> {
    this.logger.log('updateInternationalization');

    const internationalization =
      await this.internationalizationRepository.getInternationalization(
        updateInternationalizationData.id,
      );
    console.log(internationalization);

    const data = Object.assign(
      internationalization,
      updateInternationalizationData,
    );
    if (internationalization) {
      await this.internationalizationRepository.updateInternationalization(
        data,
      );
      return 'Internationalization updated';
    }
    throw new NotFoundException('Cant update Internationalization');
  }
  async deleteInternationalization(
    InternationalizationId: string,
  ): Promise<boolean> {
    this.logger.log('deleteInternationalization');
    const internationalization = await this.getInternationalization(
      InternationalizationId,
    );
    if (!internationalization) {
      throw new NotFoundException('Internationalization not found');
    }
    const isDeleted =
      await this.internationalizationRepository.deleteInternationalization(
        internationalization.id,
      );

    return isDeleted;
  }
}
