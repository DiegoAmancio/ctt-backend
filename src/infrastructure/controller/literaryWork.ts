import {
  JwtAuthGuard,
  RolesGuard,
  Roles,
  Role,
  CurrentUser,
} from '@domain/jwt';
import {
  getAllLiteraryWorkDTO,
  GetLiteraryWorkDTO,
  CreateLiteraryWorkDTO,
  UpdateLiteraryWorkDTO,
  GetUserLiteraryWorksDTO,
  LiteraryWorkDTO,
} from '@domain/literaryWork/dto';
import { UserTokenDTO } from '@domain/user/dto';
import { LiteraryWorkServiceImpl } from '@domain/literaryWork/interfaces';
import {
  Controller,
  Logger,
  Inject,
  Body,
  Get,
  UseGuards,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Language } from '@shared/enum';
import { LITERARY_WORK_SERVICE } from '@shared/utils/constants';

@Controller()
export class LiteraryWorkController {
  private readonly logger = new Logger(LiteraryWorkController.name);
  constructor(
    @Inject(LITERARY_WORK_SERVICE)
    private readonly literaryWorkService: LiteraryWorkServiceImpl,
  ) {}

  async getAllLiteraryWorkDTOs(
    @Body() data: getAllLiteraryWorkDTO,
  ): Promise<LiteraryWorkDTO[]> {
    this.logger.log('LiteraryWork');

    return this.literaryWorkService.getAllLiteraryWorkDTO(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  async getUserLiteraryWorks(
    @CurrentUser() { id },
    @Body() language: Language,
  ): Promise<GetUserLiteraryWorksDTO> {
    this.logger.log('getUserLiteraryWorks');

    return this.literaryWorkService.getUserLiteraryWorks(id, language);
  }

  @Get()
  async getLiteraryWork(
    @Body() literaryWork: GetLiteraryWorkDTO,
  ): Promise<LiteraryWorkDTO> {
    this.logger.log('LiteraryWork');

    return this.literaryWorkService.getLiteraryWork(literaryWork);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createLiteraryWork(
    @Body() input: CreateLiteraryWorkDTO,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<LiteraryWorkDTO> {
    this.logger.log('Update LiteraryWork');

    return this.literaryWorkService.createLiteraryWork({
      ...input,
      adminId: id,
    });
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async updateLiteraryWork(
    @Body() input: UpdateLiteraryWorkDTO,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('Update LiteraryWork');

    return this.literaryWorkService.updateLiteraryWork({
      ...input,
      adminId: id,
    });
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async deleteLiteraryWork(@Body('id') id: string): Promise<boolean> {
    this.logger.log('Delete LiteraryWork');

    return this.literaryWorkService.deleteLiteraryWork(id);
  }
}
