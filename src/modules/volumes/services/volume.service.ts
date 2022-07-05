import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  VolumeDto,
  CreateVolumeDTO,
  UpdateVolumeDTO,
  getAllVolume,
} from '../dto';
import {
  IUserVolumeRepository,
  IVolumeRepository,
  IVolumeService,
} from '../interfaces';
import { Volume } from '../infra/database';
import {
  I_LITERARY_WORK_REPOSITORY,
  I_USER_SERVICE,
  I_USER_VOLUME_REPOSITORY,
  I_VOLUME_REPOSITORY,
} from '@shared/utils/constants';
import { IUserService } from '@modules/user/interfaces';
import { Language } from '@shared/enum';
import { ILiteraryWorkRepository } from '@modules/literaryWork/interfaces';
import { UserTokenDTO } from '@modules/user/Dto';

@Injectable()
export class VolumeService implements IVolumeService {
  private readonly logger = new Logger('Volume service');
  constructor(
    @Inject(I_VOLUME_REPOSITORY)
    private readonly volumeRepository: IVolumeRepository,
    @Inject(I_USER_VOLUME_REPOSITORY)
    private readonly iUserVolumeRepository: IUserVolumeRepository,
    @Inject(I_USER_SERVICE)
    private readonly userService: IUserService,
    @Inject(I_LITERARY_WORK_REPOSITORY)
    private readonly literaryWorkRepository: ILiteraryWorkRepository,
  ) {}

  async getAllVolume(
    data: getAllVolume,
    userToken?: UserTokenDTO,
  ): Promise<VolumeDto[]> {
    let volumes = [];
    if (data.literaryWork) {
      this.logger.log('getAllVolume - getAllLiteraryWorkVolumes');

      const literaryWork = await this.literaryWorkRepository.getLiteraryWork(
        data.literaryWork,
      );

      const databaseVolumes =
        await this.volumeRepository.getAllLiteraryWorkVolumes(
          data,
          literaryWork,
        );
      volumes = databaseVolumes.map((volume) => {
        volume.literaryWork = literaryWork;
        return volume;
      });
    } else {
      this.logger.log('getAllVolume');

      volumes = await this.volumeRepository.getAllVolume(data);
    }

    let volumesMapped = volumes.map((Volume) =>
      this.mapperVolumeEntityToDto(Volume, data.language),
    );
    if (userToken) {
      const user = await this.userService.getUser(userToken.id);

      const userVolumes = await this.iUserVolumeRepository.getAllUserVolume({
        language: Language.ptBR,
        limit: 0,
        offset: 0,
        user: user,
      });

      const userVolumesId = userVolumes.map(
        (userVolume) => userVolume.volume + ``,
      );

      volumesMapped = volumesMapped.map((volume) => {
        volume.haveVolume = userVolumesId.includes(volume.id);
        if (volume.haveVolume) {
          const userVolume = userVolumes.filter(
            (userVolume) => userVolume.volume + '' === volume.id,
          )[0];
          volume.purchasedDate = userVolume.purchasedDate;
          volume.purchasedPrice =
            userVolume.purchasedPriceUnit + ' ' + userVolume.purchasedPrice;
        }
        return volume;
      });
    }

    return volumesMapped;
  }
  async createVolume(data: CreateVolumeDTO): Promise<VolumeDto> {
    this.logger.log('createVolume');
    const user = await this.userService.getUser(data.adminId);
    const literaryWork = await this.literaryWorkRepository.getLiteraryWork(
      data.literaryWork,
    );
    if (!data.dimensions) {
      data.dimensions = literaryWork.dimensions;
    }
    if (!data.paperType) {
      data.paperType = literaryWork.paperType;
    }

    const volumeSaved = await this.volumeRepository.createAndSaveVolume({
      ...data,
      language: literaryWork.language,
      updatedBy: user,
      registeredBy: user,
      literaryWork: literaryWork,
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
      name: literaryWork.name,
      type: literaryWork.type,
      edition: literaryWork.edition,
      country: literaryWork.country,
      categories: literaryWork.categories,
    };

    return volumeMapped;
  };
}
