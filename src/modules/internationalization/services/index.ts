import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InternationalizationDto, CreateInternationalizationDTO } from '../dto';
import {
  InternationalizationRepositoryInterface,
  InternationalizationServiceInterface,
} from '../interfaces';
import { Language } from '@shared/enum';
import { UpdateInternationalizationDto } from '../dto/updateInternationalization.dto';
import { ILiteraryWorkRepository } from '@modules/LiteraryWork/interfaces';
import {
  I_LITERARY_WORK_REPOSITORY,
  I_INTERNATIONALIZATION_REPOSITORY,
  I_VOLUME_REPOSITORY,
} from '@shared/utils/constants';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { IVolumeRepository } from '@modules/volumes/interfaces';

@Injectable()
export class InternationalizationService
  implements InternationalizationServiceInterface
{
  private readonly logger = new Logger('Internationalization service');
  constructor(
    @Inject(I_INTERNATIONALIZATION_REPOSITORY)
    private readonly internationalizationRepository: InternationalizationRepositoryInterface,
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
