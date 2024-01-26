import {
  JwtAuthGuard,
  RolesGuard,
  CurrentUser,
  Roles,
  Role,
} from '@domain/jwt';
import { UserTokenDTO } from '@domain/user/dto';
import { CreateUserVolumeDTO, UserVolumeDTO } from '@domain/userVolume/dto';
import { UserVolumeServiceImpl } from '@domain/userVolume/interfaces';
import {
  Logger,
  Inject,
  UseGuards,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Query,
  Controller,
} from '@nestjs/common';
import { Coin, Language } from '@shared/enum';
import { USER_VOLUME_SERVICE } from '@shared/utils/constants';

@Controller('userVolume')
export class UserVolumeController {
  private readonly logger = new Logger(UserVolumeController.name);
  constructor(
    @Inject(USER_VOLUME_SERVICE)
    private readonly userVolumeService: UserVolumeServiceImpl,
  ) {}

  @Get('getAllUserVolumes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllUserVolumes(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('language') language: Language,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<UserVolumeDTO[]> {
    this.logger.log('User volume');

    return this.userVolumeService.getAllUserVolume({
      offset,
      limit,
      language,
      user: id,
    });
  }

  @Get()
  async UserVolume(@Query('id') id: string): Promise<UserVolumeDTO> {
    this.logger.log('User volume');

    return this.userVolumeService.getUserVolume(id);
  }

  @Get('getCollectionValue')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCollectionValue(
    @Query('coin') coin: Coin,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('User volume');

    return this.userVolumeService.getCollectionValue(id, coin);
  }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  async createUserVolume(
    @Body() input: CreateUserVolumeDTO,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<UserVolumeDTO> {
    this.logger.log('Update Volume');

    const message = await this.userVolumeService.createUserVolume({
      ...input,
      user: id,
    });
    return message;
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  async updateUserVolume(
    @Body() input: CreateUserVolumeDTO,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('Update Volume');

    const message = await this.userVolumeService.updateUserVolume({
      ...input,
      user: id,
    });
    return message;
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  async deleteUserVolume(
    @Query('volumeId') volumeId: string,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<boolean> {
    this.logger.log('Delete User Volume');

    return await this.userVolumeService.deleteUserVolume(volumeId, id);
  }
}
