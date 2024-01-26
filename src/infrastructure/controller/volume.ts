import {
  JwtAuthGuard,
  CurrentUser,
  RolesGuard,
  Roles,
  Role,
} from '@domain/jwt';
import { UserTokenDTO } from '@domain/user/dto';
import {
  CreateVolumeDTO,
  UpdateVolumeDTO,
  VolumeDTO,
} from '@domain/volume/dto';
import { VolumeServiceImpl } from '@domain/volume/interfaces';
import {
  Controller,
  Logger,
  Inject,
  Get,
  UseGuards,
  Put,
  Delete,
  Body,
  Query,
  Post,
} from '@nestjs/common';
import { Language } from '@shared/enum';
import { VOLUME_SERVICE } from '@shared/utils/constants';

@Controller('volume')
export class VolumeController {
  private readonly logger = new Logger(VolumeController.name);
  constructor(
    @Inject(VOLUME_SERVICE)
    private readonly volumeService: VolumeServiceImpl,
  ) {}

  @Get('getLastAddedVolumes')
  async getLastAddedVolumes(
    @Query('language') language: Language,
  ): Promise<VolumeDTO[]> {
    this.logger.log('getLastAddedVolumes');

    return this.volumeService.getLastAddedVolumes(language);
  }
  @Get('getAllVolumes')
  @UseGuards(JwtAuthGuard)
  async getAllVolumes(
    @Query('offset') offset,
    @Query('limit') limit,
    @Query('language') language,
    @Query('literaryWork') literaryWork,
    @CurrentUser() currentUser: UserTokenDTO,
  ): Promise<VolumeDTO[]> {
    this.logger.log('getAllVolumes');

    return this.volumeService.getAllVolume(
      {
        language,
        limit,
        offset,
        literaryWork,
      },
      currentUser,
    );
  }
  @Get()
  async Volume(
    @Query('id') id: string,
    @Query('language') language: Language,
  ): Promise<VolumeDTO> {
    this.logger.log('Volume');

    return this.volumeService.getVolume(id, language);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createVolume(
    @Body() input: CreateVolumeDTO,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<VolumeDTO> {
    this.logger.log('Update Volume');

    const message = await this.volumeService.createVolume({
      ...input,
      adminId: id,
    });
    return message;
  }
  @Put()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async updateVolume(
    @Body() input: UpdateVolumeDTO,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('Update Volume');

    const message = await this.volumeService.updateVolume({
      ...input,
      adminId: id,
    });
    return message;
  }
  @Delete()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async deleteVolume(@Body() id: string): Promise<boolean> {
    this.logger.log('Delete Volume');

    return await this.volumeService.deleteVolume(id);
  }
}
