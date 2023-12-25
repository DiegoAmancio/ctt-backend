import {
  InternationalizationDTO,
  CreateInternationalizationDTO,
  UpdateInternationalizationDTO,
} from '@domain/internationalization/dto';
import {
  InternationalizationServiceImpl,
  InternationalizationRepositoryImpl,
} from '@domain/internationalization/interfaces';
import { ILiteraryWorkRepository } from '@domain/literaryWork/interfaces';
import { VolumeRepositoryImpl } from '@domain/volume/interfaces';
import { LiteraryWork } from '@infrastructure/database/model';
import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common';
import { Language } from '@shared/enum';
import {
  INTERNATIONALIZATION_REPOSITORY,
  LITERARY_WORK_REPOSITORY,
  VOLUME_REPOSITORY,
} from '@shared/utils/constants';

@Injectable()
export class InternationalizationService
  implements InternationalizationServiceImpl
{
  private readonly logger = new Logger(InternationalizationService.name);
  constructor(
    @Inject(INTERNATIONALIZATION_REPOSITORY)
    private readonly internationalizationRepository: InternationalizationRepositoryImpl,
    @Inject(LITERARY_WORK_REPOSITORY)
    private readonly literaryWorkRepository: ILiteraryWorkRepository,
    @Inject(VOLUME_REPOSITORY)
    private readonly volumeRepository: VolumeRepositoryImpl,
  ) {}
  async getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWork,
    language: Language,
  ): Promise<InternationalizationDTO> {
    this.logger.log('getInternationalization' + literaryWork.id);
    const internationalization =
      await this.internationalizationRepository.getInternationalizationByLiteraryWork(
        literaryWork,
        language,
      );

    if (!internationalization) {
      throw new NotFoundException('Internationalization not found');
    }
    return internationalization;
  }
  async createInternationalization(
    data: CreateInternationalizationDTO,
  ): Promise<InternationalizationDTO> {
    this.logger.log('createInternationalization');
    const internationalizationAux = {
      ...data,
      literaryWork: null,
      volume: null,
    };

    if (data.literaryWork) {
      const literaryWork = await this.literaryWorkRepository.getLiteraryWork(
        data.literaryWork,
      );
      internationalizationAux.literaryWork = literaryWork;
    } else if (data.volume) {
      const volume = await this.volumeRepository.getVolume(data.volume);
      internationalizationAux.volume = volume;
    }

    if (
      !internationalizationAux.literaryWork &&
      !internationalizationAux.volume
    ) {
      throw new NotFoundException('literaryWork or volume not found');
    }

    const internationalizationSaved =
      await this.internationalizationRepository.createAndSaveInternationalization(
        internationalizationAux,
      );

    return internationalizationSaved;
  }
  async getInternationalization(id: string): Promise<InternationalizationDTO> {
    this.logger.log('getInternationalization' + id);
    const internationalization =
      await this.internationalizationRepository.getInternationalization(id);

    if (!internationalization) {
      throw new NotFoundException('Internationalization not found');
    }
    return internationalization;
  }
  async updateInternationalization(
    updateInternationalizationData: UpdateInternationalizationDTO,
  ): Promise<string> {
    this.logger.log('updateInternationalization');

    const internationalization =
      await this.internationalizationRepository.getInternationalization(
        updateInternationalizationData.id,
      );

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
