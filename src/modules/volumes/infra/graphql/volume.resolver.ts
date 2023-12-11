import { CurrentUser } from '@domain/jwt/current-user.decorator';
import { GqlAuthGuard } from '@domain/jwt/gql-auth.guard';
import { GqlOpenAuthGuard } from '@domain/jwt/gql-open-auth.guard';
import { Role } from '@domain/jwt/role.enum';
import { Roles } from '@domain/jwt/roles.decorator';
import { RolesGuard } from '@domain/jwt/roles.guard';
import { UserTokenDTO } from '@modules/user/Dto';
import { getAllVolume } from '@modules/volumes/dto';
import { IVolumeService } from '@modules/volumes/interfaces';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { I_VOLUME_SERVICE } from '@shared/utils/constants';
import { GetVolumeInput, CreateVolumeInput, UpdateVolumeInput } from './inputs';
import { VolumeType } from './types';

@Resolver(() => VolumeType)
export class VolumeResolver {
  private readonly logger = new Logger('Volume resolver');
  constructor(
    @Inject(I_VOLUME_SERVICE)
    private readonly VolumeService: IVolumeService,
  ) {}
  @Query(() => [VolumeType])
  @UseGuards(GqlOpenAuthGuard)
  async getAllVolumes(
    @Args('input') data: getAllVolume,
    @CurrentUser() currentUser: UserTokenDTO,
  ): Promise<VolumeType[]> {
    this.logger.log('Volume');

    return this.VolumeService.getAllVolume(data, currentUser);
  }
  @Query(() => VolumeType)
  async Volume(
    @Args('input') { id, language }: GetVolumeInput,
  ): Promise<VolumeType> {
    this.logger.log('Volume');

    return this.VolumeService.getVolume(id, language);
  }

  @Mutation(() => VolumeType)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createVolume(
    @Args('input') input: CreateVolumeInput,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<VolumeType> {
    this.logger.log('Update Volume');

    const message = await this.VolumeService.createVolume({
      ...input,
      adminId: id,
    });
    return message;
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async updateVolume(
    @Args('input') input: UpdateVolumeInput,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('Update Volume');

    const message = await this.VolumeService.updateVolume({
      ...input,
      adminId: id,
    });
    return message;
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async deleteVolume(@Args('id') id: string): Promise<boolean> {
    this.logger.log('Delete Volume');

    return await this.VolumeService.deleteVolume(id);
  }
}
