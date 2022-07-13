import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  CreateUserVolumeDTO,
  getAllUserVolumeDTO,
  UpdateUserVolumeDTO,
  UserVolumeDTO,
} from '../dto';
import {
  IVolumeRepository,
  IUserVolumeService,
  IUserVolumeRepository,
} from '../interfaces';
import {
  I_LITERARY_WORK_REPOSITORY,
  I_LITERARY_WORK_SERVICE,
  I_USER_REPOSITORY,
  I_USER_VOLUME_REPOSITORY,
  I_VOLUME_REPOSITORY,
} from '@shared/utils/constants';
import { IUserRepository } from '@modules/user/interfaces';
import { Coin, Language } from '@shared/enum';
import { ILiteraryWorkRepository } from '@modules/LiteraryWork/interfaces';
import { getMetricsFromUserVolumes } from '@shared/utils/userVolume';

@Injectable()
export class UserVolumeService implements IUserVolumeService {
  private readonly logger = new Logger('User Volume service');
  constructor(
    @Inject(I_VOLUME_REPOSITORY)
    private readonly volumeRepository: IVolumeRepository,
    @Inject(I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(I_LITERARY_WORK_REPOSITORY)
    private readonly literaryworkRepository: ILiteraryWorkRepository,
    @Inject(I_USER_VOLUME_REPOSITORY)
    private readonly userVolumeRepository: IUserVolumeRepository,
    private readonly httpService: HttpService,
  ) {}
  async getCollectionValue(userId: string, coinUnit: Coin): Promise<string> {
    this.logger.log('getCollectionValue');
    const userVolumes = await this.getAllUserVolume({
      language: Language.ptBR,
      limit: 0,
      offset: 0,
      user: userId,
    });
    const coins = userVolumes
      .reduce((acc, { purchasedPriceUnit }) => {
        if (coinUnit !== purchasedPriceUnit) {
          acc.push(purchasedPriceUnit);
        }
        return acc;
      }, [])
      .map((coin) => coin + '-' + coinUnit)
      .join(',');

    const haveAnotherCoins = coins.trim() !== '';
    const cotations = {
      [coinUnit]: 1,
    };
    if (haveAnotherCoins) {
      const getCotation = 'https://economia.awesomeapi.com.br/last/' + coins;
      const { data } = await this.httpService.axiosRef.get(getCotation);
      Object.values(data).forEach(
        ({ code, bid }: { code: string; bid: string }) => {
          cotations[code] = Number(bid);
        },
      );
    }

    const collectionValue = userVolumes.reduce((acc, value) => {
      const convertValue =
        Number(value.purchasedPrice) * cotations[value.purchasedPriceUnit];

      acc += convertValue;
      return acc;
    }, 0);

    return coinUnit + ' ' + collectionValue;
  }
  async createUserVolume(data: CreateUserVolumeDTO): Promise<UserVolumeDTO> {
    this.logger.log('createUserVolume');
    const user = await this.userRepository.getUser(data.user);
    const volume = await this.volumeRepository.getVolume(data.volume);

    if (user && volume) {
      const checkVolume =
        await this.userVolumeRepository.getUserVolumeidsByVolume(user, volume);

      if (checkVolume && checkVolume.length === 0) {
        if (!data.purchasedPriceUnit) {
          data.purchasedPriceUnit = volume.coverPriceUnit;
        }
        if (!data.purchasedPrice) {
          data.purchasedPrice = volume.coverPrice;
        }
        const userVolume = await this.userVolumeRepository.createUserVolume({
          ...data,
          user: user,
          volume: volume,
        });
        await this.updateLiteraryWorkClassifications(volume.literaryWork.id);

        return userVolume;
      }
    }
    throw new BadRequestException('You have this volume');
  }
  async getUserVolume(id: string): Promise<UserVolumeDTO> {
    this.logger.log('getUserVolume');
    const userVolume = await this.userVolumeRepository.getUserVolume(id);
    return userVolume;
  }
  async updateUserVolume({
    purchasedDate,
    user,
    volume,
    purchasedPrice,
    purchasedPriceUnit,
    userAcquisitionDifficulty,
    userClassification,
  }: UpdateUserVolumeDTO): Promise<string> {
    this.logger.log('updateUserVolume');
    const userDatabase = await this.userRepository.getUser(user);
    const volumeDatabase = await this.volumeRepository.getVolume(volume);

    if (userDatabase && volumeDatabase) {
      const userVolume = await this.userVolumeRepository.getUserVolumeByVolume(
        userDatabase,
        volumeDatabase,
      );

      if (userVolume.length === 0) {
        throw new BadRequestException('Volume not found');
      }
      const userVolumeFiltered = userVolume[0];
      const userVolumeUpdated = Object.assign(userVolumeFiltered, {
        purchasedDate: purchasedDate
          ? purchasedDate
          : userVolumeFiltered.purchasedDate,
        purchasedPrice: purchasedPrice
          ? purchasedPrice
          : userVolumeFiltered.purchasedPrice,
        purchasedPriceUnit: purchasedPriceUnit
          ? purchasedPriceUnit
          : userVolumeFiltered.purchasedPriceUnit,

        userAcquisitionDifficulty: userAcquisitionDifficulty
          ? userAcquisitionDifficulty
          : userVolumeFiltered.userAcquisitionDifficulty,
        userClassification: userClassification
          ? userClassification
          : userVolumeFiltered.userClassification,
      });

      await this.userVolumeRepository.updateUserVolume(userVolumeUpdated);
      await this.updateLiteraryWorkClassifications(
        volumeDatabase.literaryWork.id,
      );

      return 'UserVolume updated';
    }
    throw new BadRequestException('Volume not found');
  }
  async deleteUserVolume(volumeId: string, userId: string): Promise<boolean> {
    this.logger.log('deleteUserVolume');
    const volume = await this.volumeRepository.getVolume(volumeId);
    const user = await this.userRepository.getUser(userId);
    const userVolume = await this.userVolumeRepository.deleteUserVolume(
      volume,
      user,
    );
    return userVolume;
  }
  async getAllUserVolume(data: getAllUserVolumeDTO): Promise<UserVolumeDTO[]> {
    const user = await this.userRepository.getUser(data.user);

    const userVolumes = await this.userVolumeRepository.getAllUserVolume({
      ...data,
      user: user,
    });
    return userVolumes;
  }

  updateLiteraryWorkClassifications = async (literaryWorkId: string) => {
    const literaryWork = await this.literaryworkRepository.getLiteraryWork(
      literaryWorkId,
      ['volumes'],
    );

    const userVolumesIds = literaryWork.volumes.map((volume) => volume.id);

    const userVolumes =
      await this.userVolumeRepository.getAllUserVolumesByVolumes(
        userVolumesIds,
      );

    const {
      userAcquisitionDifficultyCount,
      userClassificationCount,
      userAcquisitionDifficultyTotal,
      userClassificationTotal,
    } = getMetricsFromUserVolumes(userVolumes);

    const userAcquisitionDifficultyAverage =
      userAcquisitionDifficultyCount > 0
        ? userAcquisitionDifficultyTotal / userAcquisitionDifficultyCount
        : 0;
    const userClassificationAverage =
      userClassificationCount > 0
        ? userClassificationTotal / userClassificationCount
        : 0;
    delete literaryWork.volumes;
    await this.literaryworkRepository.updateLiteraryWork(
      Object.assign(literaryWork, {
        acquisitionDifficulty: userAcquisitionDifficultyAverage,
        classification: userClassificationAverage,
      }),
    );
  };
}
