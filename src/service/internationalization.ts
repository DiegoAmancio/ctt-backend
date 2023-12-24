import {
  InternationalizationDto,
  CreateInternationalizationDTO,
} from '@domain/internationalization/dto';
import { UpdateInternationalizationDto } from '@domain/internationalization/dto/updateInternationalization';
import {
  InternationalizationServiceImpl,
  InternationalizationRepositoryImpl,
} from '@domain/internationalization/interfaces';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { ILiteraryWorkRepository } from '@modules/literaryWork/interfaces';
import { IVolumeRepository } from '@modules/volumes/interfaces';
import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common';
import { Language } from '@shared/enum';
import {
  INTERNATIONALIZATION_REPOSITORY,
  I_LITERARY_WORK_REPOSITORY,
  I_VOLUME_REPOSITORY,
} from '@shared/utils/constants';

@Injectable()
export class InternationalizationService
  implements InternationalizationServiceImpl
{
  private readonly logger = new Logger('Internationalization service');
  constructor(
    @Inject(INTERNATIONALIZATION_REPOSITORY)
    private readonly internationalizationRepository: InternationalizationRepositoryImpl,
    @Inject(I_LITERARY_WORK_REPOSITORY)
    private readonly literaryWorkRepository: ILiteraryWorkRepository,

    @Inject(I_VOLUME_REPOSITORY)
    private readonly volumeRepository: IVolumeRepository,
  ) {}
  async getInternationalizationByLiteraryWork(
    literaryWork: LiteraryWork,
    language: Language,
  ): Promise<InternationalizationDto> {
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
  ): Promise<InternationalizationDto> {
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
    updateInternationalizationData: UpdateInternationalizationDto,
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
