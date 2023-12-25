import {
  JwtAuthGuard,
  CurrentUser,
  RolesGuard,
  Roles,
  Role,
} from '@domain/jwt';
import { UserTokenDTO } from '@domain/user/dto';
import { GetAllVolumeDTO } from '@domain/userVolume/dto';
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
} from '@nestjs/common';
import { Language } from '@shared/enum';
import { VOLUME_SERVICE } from '@shared/utils/constants';

@Controller()
export class VolumeController {
  private readonly logger = new Logger(VolumeController.name);
  constructor(
    @Inject(VOLUME_SERVICE)
    private readonly VolumeService: VolumeServiceImpl,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllVolumes(
    @Body('input') data: GetAllVolumeDTO,
    @CurrentUser() currentUser: UserTokenDTO,
  ): Promise<VolumeDTO[]> {
    this.logger.log('Volume');

    return this.VolumeService.getAllVolumeDTO(data, currentUser);
  }
  @Get()
  async Volume(
    @Query('id') id: string,
    @Query('language') language: Language,
  ): Promise<VolumeDTO> {
    this.logger.log('Volume');

    return this.VolumeService.getVolume(id, language);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createVolume(
    @Body() input: CreateVolumeDTO,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<VolumeDTO> {
    this.logger.log('Update Volume');

    const message = await this.VolumeService.createVolume({
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

    const message = await this.VolumeService.updateVolume({
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

    return await this.VolumeService.deleteVolume(id);
  }
}
