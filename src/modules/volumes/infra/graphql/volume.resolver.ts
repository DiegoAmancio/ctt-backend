import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { VolumeType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IVolumeService } from '@modules/volumes/interfaces';
import { I_VOLUME_SERVICE } from '@shared/utils/constants';
import { RolesGuard } from '@modules/auth/jwt/roles.guard';
import { Role } from '@modules/auth/jwt/role.enum';
import { Roles } from '@modules/auth/jwt/roles.decorator';
import { CurrentUser } from '@modules/auth/jwt/current-user.decorator';
import { UserTokenDTO } from '@modules/user/dto';
import { GetVolumeInput, CreateVolumeInput, UpdateVolumeInput } from './inputs';
import { getAllVolume } from '@modules/volumes/dto';
import { GqlOpenAuthGuard } from '@modules/auth/jwt/gql-open-auth.guard';

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
