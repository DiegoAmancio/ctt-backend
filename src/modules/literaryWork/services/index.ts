import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  LiteraryWorkDto,
  CreateLiteraryWorkDTO,
  UpdateLiteraryWorkDTO,
} from '../dto';
import { ILiteraryWorkRepository, ILiteraryWorkService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { LiteraryWorkRepository, LiteraryWork } from '../infra/database';
import { I_USER_SERVICE } from '@shared/utils/constants';
import { IUserService } from '@modules/user/interfaces';
import { Edition, Language, PaperType, Type } from '@shared/enum';

@Injectable()
export class LiteraryWorkService implements ILiteraryWorkService {
  private readonly logger = new Logger('LiteraryWork service');
  constructor(
    @InjectRepository(LiteraryWorkRepository)
    private readonly LiteraryWorkRepository: ILiteraryWorkRepository,
    @Inject(I_USER_SERVICE)
    private readonly userService: IUserService,
  ) {}
  async createLiteraryWork(
    data: CreateLiteraryWorkDTO,
  ): Promise<LiteraryWorkDto> {
    this.logger.log('createLiteraryWork');
    const user = await this.userService.getUser(data.adminId);
    const LiteraryWorkSaved =
      await this.LiteraryWorkRepository.createAndSaveLiteraryWork({
        ...data,
        updatedBy: user,
        registeredBy: user,
      });

    return this.mapperLiteraryWorkEntityToDto(LiteraryWorkSaved, null);
  }
  async getLiteraryWork(
    id: string,
    language: Language,
  ): Promise<LiteraryWorkDto> {
    this.logger.log('getLiteraryWork' + id);
    const LiteraryWork = await this.LiteraryWorkRepository.getLiteraryWork(id);

    if (!LiteraryWork) {
      throw new NotFoundException('LiteraryWork not found');
    }
    return this.mapperLiteraryWorkEntityToDto(LiteraryWork, language);
  }
  async updateLiteraryWork(
    updateLiteraryWorkData: UpdateLiteraryWorkDTO,
  ): Promise<string> {
    this.logger.log('updateLiteraryWork');

    const LiteraryWork = await this.LiteraryWorkRepository.getLiteraryWork(
      updateLiteraryWorkData.id,
    );
    const user = await this.userService.getUser(updateLiteraryWorkData.adminId);

    const data = Object.assign(LiteraryWork, updateLiteraryWorkData);
    if (LiteraryWork && user) {
      await this.LiteraryWorkRepository.updateLiteraryWork({
        ...data,
        registeredBy: LiteraryWork.registeredBy,
        updatedBy: user,
      });
      return 'LiteraryWork updated';
    }
    throw new NotFoundException('Cant update LiteraryWork');
  }
  async deleteLiteraryWork(LiteraryWorkId: string): Promise<boolean> {
    this.logger.log('deleteLiteraryWork');
    const LiteraryWork = await this.getLiteraryWork(LiteraryWorkId, null);
    if (!LiteraryWork) {
      throw new NotFoundException('LiteraryWork not found');
    }
    const isDeleted = await this.LiteraryWorkRepository.deleteLiteraryWork(
      LiteraryWork.id,
    );

    return isDeleted;
  }

  mapperLiteraryWorkEntityToDto = (
    literaryWork: LiteraryWork,
    language: Language,
  ): LiteraryWorkDto => {
    let internationalization: {
      synopsis: string;
      edition: Edition;
      type: Type;
      paperType: PaperType;
    };

    if (
      language &&
      literaryWork.internationalization &&
      literaryWork.internationalization.length > 0
    ) {
      const filteredInter = literaryWork.internationalization.filter(
        (inter) => inter.language === language,
      );
      const { synopsis, edition, type, paperType } = filteredInter[0];

      internationalization.synopsis = synopsis;
      internationalization.edition = edition;
      internationalization.type = type;
      internationalization.paperType = paperType;
    } else {
      internationalization = {
        synopsis: null,
        edition: null,
        type: null,
        paperType: null,
        ...internationalization,
      };
    }

    let literaryWorkMapped: LiteraryWorkDto = {
      ...literaryWork,
      registeredBy: literaryWork.registeredBy.name,
      updatedBy: literaryWork.updatedBy.name,
      ...internationalization,
    };

    return literaryWorkMapped;
  };
}
