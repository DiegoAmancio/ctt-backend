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

    return this.mapperLiteraryWorkEntityToDto(LiteraryWorkSaved);
  }
  async getLiteraryWork(id: string): Promise<LiteraryWorkDto> {
    this.logger.log('getLiteraryWork' + id);
    const LiteraryWork = await this.LiteraryWorkRepository.getLiteraryWork(id);

    if (!LiteraryWork) {
      throw new NotFoundException('LiteraryWork not found');
    }
    return this.mapperLiteraryWorkEntityToDto(LiteraryWork);
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
    const LiteraryWork = await this.getLiteraryWork(LiteraryWorkId);
    if (!LiteraryWork) {
      throw new NotFoundException('LiteraryWork not found');
    }
    const isDeleted = await this.LiteraryWorkRepository.deleteLiteraryWork(
      LiteraryWork.id,
    );

    return isDeleted;
  }

  mapperLiteraryWorkEntityToDto = (
    LiteraryWork: LiteraryWork,
  ): LiteraryWorkDto => {
    const LiteraryWorkMapped = {
      ...LiteraryWork,
      registeredBy: LiteraryWork.registeredBy.name,
      updatedBy: LiteraryWork.updatedBy.name,
    };
    return LiteraryWorkMapped;
  };
}
