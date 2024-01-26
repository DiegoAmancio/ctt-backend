import { UserRepositoryImp } from '@domain/user/interfaces';
import {
  CreateUserVolumeDTO,
  UserVolumeDTO,
  UpdateUserVolumeDTO,
  GetAllUserVolumeDTO,
} from '@domain/userVolume/dto';
import {
  UserVolumeServiceImpl,
  UserVolumeRepositoryImpl,
} from '@domain/userVolume/interfaces';
import { VolumeRepositoryImpl } from '@domain/volume/interfaces';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Coin, Language } from '@shared/enum';
import {
  VOLUME_REPOSITORY,
  USER_REPOSITORY,
  USER_VOLUME_REPOSITORY,
} from '@shared/utils/constants';

@Injectable()
export class UserVolumeService implements UserVolumeServiceImpl {
  private readonly logger = new Logger(UserVolumeService.name);
  constructor(
    @Inject(VOLUME_REPOSITORY)
    private readonly volumeRepository: VolumeRepositoryImpl,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryImp,
    @Inject(USER_VOLUME_REPOSITORY)
    private readonly userVolumeRepository: UserVolumeRepositoryImpl,
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
      });

      await this.userVolumeRepository.updateUserVolume(userVolumeUpdated);
      return 'UserVolume updated';
    }
    throw new BadRequestException('Volume not found');
  }
  async deleteUserVolume(volumeId: string, userId: string): Promise<boolean> {
    this.logger.log('deleteUserVolume');

    const userVolume = await this.userVolumeRepository.deleteUserVolume(
      volumeId,
      userId,
    );
    return userVolume;
  }
  async getAllUserVolume(data: GetAllUserVolumeDTO): Promise<UserVolumeDTO[]> {
    const user = await this.userRepository.getUser(data.user);

    return this.userVolumeRepository.getAllUserVolume({
      ...data,
      user: user,
    });
  }
}
