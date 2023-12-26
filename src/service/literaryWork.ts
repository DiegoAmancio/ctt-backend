import { AuthorRepositoryImpl } from '@domain/author/interfaces';
import { UserServiceImp } from '@domain/user/interfaces';
import { User, LiteraryWork } from '@infrastructure/database/model';
import {
  GetUserLiteraryWorksDTO,
  LiteraryWorkDTOCollection,
  getAllLiteraryWorkDTO,
  LiteraryWorkDTO,
  CreateLiteraryWorkDTO,
  UpdateLiteraryWorkDTO,
  GetLiteraryWorkDTO,
} from '@domain/literaryWork/dto';
import {
  LiteraryWorkServiceImpl,
  ILiteraryWorkRepository,
} from '@domain/literaryWork/interfaces';
import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common';
import { Language, Status } from '@shared/enum';
import {
  LITERARY_WORK_REPOSITORY,
  USER_SERVICE,
  AUTHOR_REPOSITORY,
} from '@shared/utils/constants';

@Injectable()
export class LiteraryWorkService implements LiteraryWorkServiceImpl {
  private readonly logger = new Logger(LiteraryWorkService.name);
  constructor(
    @Inject(LITERARY_WORK_REPOSITORY)
    private readonly literaryWorkRepository: ILiteraryWorkRepository,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceImp,
    @Inject(AUTHOR_REPOSITORY)
    private readonly authorRepository: AuthorRepositoryImpl,
  ) {}
  async getUserLiteraryWorks(
    userId: string,
    language: Language,
  ): Promise<GetUserLiteraryWorksDTO> {
    const { id, createdAt } = await this.userService.getUser(userId);
    const literaryWorks =
      await this.literaryWorkRepository.getUserLiteraryWorks(id, language);

    const literaryWorkCollections = literaryWorks.map((literaryWork) => {
      const literaryWorkAux: LiteraryWorkDTOCollection = {
        ...literaryWork,
        adquiredVolumes: Number(literaryWork.adquiredVolumes),
        totalVolumes: Number(literaryWork.totalVolumes),
        status:
          literaryWork.adquiredVolumes === literaryWork.totalVolumes
            ? Status.Complete
            : Status.InProgress,
        language: language,
      };

      return literaryWorkAux;
    });

    const totalVolumes = literaryWorkCollections.reduce((acc, literaryWork) => {
      acc += literaryWork.adquiredVolumes;
      return acc;
    }, 0);
    const completeLiteraryWorks = literaryWorkCollections.reduce(
      (acc, { adquiredVolumes, totalVolumes }) => {
        if (adquiredVolumes === totalVolumes) {
          acc += 1;
        }
        return acc;
      },
      0,
    );
    return {
      literaryWorks: literaryWorkCollections,
      totalVolumes: totalVolumes,
      completeLiteraryWorks: completeLiteraryWorks,
      totalLiteraryWorks: literaryWorkCollections.length,
      memberSince: createdAt,
    };
  }

  async getAllLiteraryWork(
    data: getAllLiteraryWorkDTO,
  ): Promise<LiteraryWorkDTO[]> {
    const literaryWorks =
      await this.literaryWorkRepository.getAllLiteraryWork(data);

    const literaryWorksMapped = literaryWorks.map((literaryWork) =>
      this.mapperLiteraryWorkEntityToDTO(literaryWork, data.language),
    );

    console.log(literaryWorksMapped);
    return literaryWorksMapped;
  }
  async createLiteraryWork(
    data: CreateLiteraryWorkDTO,
  ): Promise<LiteraryWorkDTO> {
    this.logger.log('createLiteraryWork');
    const user = await this.userService.getUser(data.adminId);
    const ilustratorBy = await this.authorRepository.get(data.ilustratorBy);
    const writterBy = await this.authorRepository.get(data.writterBy);

    const LiteraryWorkSaved =
      await this.literaryWorkRepository.createAndSaveLiteraryWork({
        ...data,
        updatedBy: new User(user),
        registeredBy: new User(user),
        writterBy: writterBy,
        ilustratorBy: ilustratorBy,
        categories: this.formatCategories(data.categories),
      });

    return this.mapperLiteraryWorkEntityToDTO(LiteraryWorkSaved, null);
  }
  async getLiteraryWork({
    id,
    language,
  }: GetLiteraryWorkDTO): Promise<LiteraryWorkDTO> {
    this.logger.log('getLiteraryWork' + id);
    const literaryWork = await this.literaryWorkRepository.getLiteraryWork(id);

    if (!literaryWork) {
      throw new NotFoundException('LiteraryWork not found');
    }
    return this.mapperLiteraryWorkEntityToDTO(literaryWork, language);
  }
  async updateLiteraryWork(
    updateLiteraryWorkData: UpdateLiteraryWorkDTO,
  ): Promise<string> {
    this.logger.log('updateLiteraryWork');

    const LiteraryWork = await this.literaryWorkRepository.getLiteraryWork(
      updateLiteraryWorkData.id,
    );
    const user = await this.userService.getUser(updateLiteraryWorkData.adminId);

    const data = Object.assign(LiteraryWork, updateLiteraryWorkData);
    if (LiteraryWork && user) {
      await this.literaryWorkRepository.updateLiteraryWork({
        ...data,
        registeredBy: LiteraryWork.registeredBy,
        updatedBy: new User(user),
        categories: this.formatCategories(data.categories),
      });
      return 'LiteraryWork updated';
    }
    throw new NotFoundException('Cant update LiteraryWork');
  }
  async deleteLiteraryWork(literaryWorkId: string): Promise<boolean> {
    this.logger.log('deleteLiteraryWork');
    const LiteraryWork = await this.getLiteraryWork({
      id: literaryWorkId,
      language: null,
    });
    if (!LiteraryWork) {
      throw new NotFoundException('LiteraryWork not found');
    }
    const isDeleted = await this.literaryWorkRepository.deleteLiteraryWork(
      LiteraryWork.id,
    );

    return isDeleted;
  }

  mapperLiteraryWorkEntityToDTO = (
    literaryWork: LiteraryWork,
    language: Language,
  ): LiteraryWorkDTO => {
    let internationalization = {
      synopsis: '',
    };

    if (
      language &&
      literaryWork.internationalization &&
      literaryWork.internationalization.length > 0
    ) {
      const filteredInter = literaryWork.internationalization.filter(
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

    const literaryWorkMapped: LiteraryWorkDTO = {
      ...literaryWork,
      registeredBy: literaryWork.registeredBy.name,
      updatedBy: literaryWork.updatedBy.name,
      writterBy: literaryWork.writterBy.name,
      ilustratorBy: literaryWork.ilustratorBy.name,
      ...internationalization,
    };

    return literaryWorkMapped;
  };

  formatCategories = (data: string[]) => {
    const categories = data.reduce((acc, value, index) => {
      acc += index > 0 ? ',' + value : value;
      return acc;
    }, '');
    return categories;
  };
}
