import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InternationalizationDto, CreateInternationalizationDTO } from '../dto';
import {
  InternationalizationRepositoryInterface,
  InternationalizationServiceInterface,
} from '../interfaces';
import { Language } from '@shared/enum';
import { UpdateInternationalizationDto } from '../dto/updateInternationalization.dto';
import { ILiteraryWorkRepository } from '@modules/literaryWork/interfaces';
import {
  I_LITERARY_WORK_REPOSITORY,
  I_INTERNATIONALIZATION_REPOSITORY,
  I_VOLUME_REPOSITORY,
} from '@shared/utils/constants';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { IVolumeRepository } from '@modules/volumes/interfaces';
import { Internationalization } from '../infra/database';

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
  async createOrUpdateInternationalization(
    data: CreateInternationalizationDTO,
  ): Promise<InternationalizationDto> {
    this.logger.log('createInternationalization');
    const internationalizationAux = {
      id: null,
      ...data,
      literaryWork: null,
      volume: null,
    };
    let createInternationalization = true;
    if (data.literaryWork) {
      const literaryWork = await this.literaryWorkRepository.getLiteraryWork(
        data.literaryWork,
      );
      const internationalization =
        await this.internationalizationRepository.getInternationalizationByLiteraryWork(
          literaryWork,
          data.language,
        );
      if (internationalization) {
        createInternationalization = false;
        internationalizationAux.id = internationalization.id;
      }
      internationalizationAux.literaryWork = literaryWork;
    } else if (data.volume) {
      const volume = await this.volumeRepository.getVolume(data.volume);
      const internationalization =
        await this.internationalizationRepository.getInternationalizationByVolume(
          volume,
          data.language,
        );

      if (internationalization) {
        createInternationalization = false;
        internationalizationAux.id = internationalization.id;
      }
      internationalizationAux.volume = volume;
    }

    if (
      !internationalizationAux.literaryWork &&
      !internationalizationAux.volume
    ) {
      throw new NotFoundException('literaryWork or volume not found');
    }
    if (createInternationalization) {
      delete internationalizationAux.id;

      const internationalization =
        await this.internationalizationRepository.createAndSaveInternationalization(
          internationalizationAux,
        );
      return internationalization;
    } else {
      await this.internationalizationRepository.updateInternationalization(
        internationalizationAux,
      );
      return internationalizationAux;
    }
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
