import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  VolumeDto,
  CreateVolumeDTO,
  UpdateVolumeDTO,
  getAllVolume,
} from '../dto';
import { IVolumeRepository, IVolumeService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { VolumeRepository, Volume } from '../infra/database';
import {
  I_LITERARYWORK_SERVICE,
  I_USER_SERVICE,
} from '@shared/utils/constants';
import { IUserService } from '@modules/user/interfaces';
import { Language } from '@shared/enum';
import { ILiteraryWorkService } from '@modules/literaryWork/interfaces';

@Injectable()
export class VolumeService implements IVolumeService {
  private readonly logger = new Logger('Volume service');
  constructor(
    @InjectRepository(VolumeRepository)
    private readonly volumeRepository: IVolumeRepository,
    @Inject(I_USER_SERVICE)
    private readonly userService: IUserService,
    @Inject(I_LITERARYWORK_SERVICE)
    private readonly literaryWorkService: ILiteraryWorkService,
  ) {}
  async getAllVolume(data: getAllVolume): Promise<VolumeDto[]> {
    const volumes = await this.volumeRepository.getAllVolume(data);

    const volumesMapped = volumes.map((Volume) =>
      this.mapperVolumeEntityToDto(Volume, data.language),
    );

    return volumesMapped;
  }
  async createVolume(data: CreateVolumeDTO): Promise<VolumeDto> {
    this.logger.log('createVolume');
    const user = await this.userService.getUser(data.adminId);
    const literaryWork = await this.literaryWorkService.getLiteraryWork(
      data.literaryWork,
      Language.enUS,
    );

    const volumeSaved = await this.volumeRepository.createAndSaveVolume({
      ...data,
      updatedBy: user,
      registeredBy: user,
      literaryWork: {
        ...literaryWork,
        internationalization: null,
        registeredBy: null,
        updatedBy: null,
        ilustratorBy: null,
        writterBy: null,
      },
    });

    return this.mapperVolumeEntityToDto(volumeSaved, null);
  }
  async getVolume(id: string, language: Language): Promise<VolumeDto> {
    this.logger.log('getVolume' + id);
    const Volume = await this.volumeRepository.getVolume(id);

    if (!Volume) {
      throw new NotFoundException('Volume not found');
    }
    return this.mapperVolumeEntityToDto(Volume, language);
  }
  async updateVolume(updateVolumeData: UpdateVolumeDTO): Promise<string> {
    this.logger.log('updateVolume');

    const Volume = await this.volumeRepository.getVolume(updateVolumeData.id);
    const user = await this.userService.getUser(updateVolumeData.adminId);

    const data = Object.assign(Volume, updateVolumeData);
    if (Volume && user) {
      await this.volumeRepository.updateVolume({
        ...data,
        registeredBy: Volume.registeredBy,
        updatedBy: user,
      });
      return 'Volume updated';
    }
    throw new NotFoundException('Cant update Volume');
  }
  async deleteVolume(VolumeId: string): Promise<boolean> {
    this.logger.log('deleteVolume');
    const Volume = await this.getVolume(VolumeId, null);
    if (!Volume) {
      throw new NotFoundException('Volume not found');
    }
    const isDeleted = await this.volumeRepository.deleteVolume(Volume.id);

    return isDeleted;
  }

  mapperVolumeEntityToDto = (volume: Volume, language: Language): VolumeDto => {
    let internationalization = {
      synopsis: '',
    };
    const literaryWork = volume.literaryWork;
    delete volume.literaryWork;
    if (
      language &&
      volume.internationalization &&
      volume.internationalization.length > 0
    ) {
      const filteredInter = volume.internationalization.filter(
        (inter) => inter.language === language,
      );
      if (filteredInter.length === 0) {
        internationalization.synopsis = 'notRegistered';
      } else {
        const { synopsis } = filteredInter[0];
        internationalization.synopsis = synopsis;
      }
    } else {
      internationalization = {
        synopsis: null,
        ...internationalization,
      };
    }

    const volumeMapped: VolumeDto = {
      ...volume,
      registeredBy: volume.registeredBy.name,
      updatedBy: volume.updatedBy.name,
      ...internationalization,
      type: literaryWork.type,
      edition: literaryWork.edition,
      country: literaryWork.country,
      categories: literaryWork.categories,
    };

    return volumeMapped;
  };
}
