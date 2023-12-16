import { CurrentUser } from '@domain/jwt/current-user.decorator';
import { GqlAuthGuard } from '@domain/jwt/gql-auth.guard';
import { Role } from '@domain/jwt/role.enum';
import { Roles } from '@domain/jwt/roles.decorator';
import { RolesGuard } from '@domain/jwt/roles.guard';
import { UserTokenDTO } from '@domain/user/dto';
import { getAllVolume } from '@modules/volumes/dto';
import { IUserVolumeService } from '@modules/volumes/interfaces';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Coin } from '@shared/enum';
import { I_USER_VOLUME_SERVICE } from '@shared/utils/constants';
import { CreateUserVolumeInput, UpdateUserVolumeInput } from './inputs';
import { UserVolumeType } from './types';

@Resolver(() => UserVolumeType)
export class UserVolumeResolver {
  private readonly logger = new Logger('User volume resolver');
  constructor(
    @Inject(I_USER_VOLUME_SERVICE)
    private readonly userVolumeService: IUserVolumeService,
  ) {}
  @Query(() => [UserVolumeType])
  @UseGuards(GqlAuthGuard, RolesGuard)
  async getAllUserVolumes(
    @Args('input') data: getAllVolume,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<UserVolumeType[]> {
    this.logger.log('User volume');

    return this.userVolumeService.getAllUserVolume({ ...data, user: id });
  }
  @Query(() => UserVolumeType)
  async UserVolume(@Args('id') id: string): Promise<UserVolumeType> {
    this.logger.log('User volume');

    return this.userVolumeService.getUserVolume(id);
  }
  @Query(() => String)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async getCollectionValue(
    @Args('coin', { type: () => Coin }) coin: Coin,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('User volume');

    return this.userVolumeService.getCollectionValue(id, coin);
  }
  @Mutation(() => UserVolumeType)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  async createUserVolume(
    @Args('input') input: CreateUserVolumeInput,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<UserVolumeType> {
    this.logger.log('Update Volume');

    const message = await this.userVolumeService.createUserVolume({
      ...input,
      user: id,
    });
    return message;
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.User)
  async updateUserVolume(
    @Args('input') input: UpdateUserVolumeInput,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('Update Volume');

    const message = await this.userVolumeService.updateUserVolume({
      ...input,
      user: id,
    });
    return message;
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.User)
  async deleteUserVolume(
    @Args('volumeId') volumeId: string,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<boolean> {
    this.logger.log('Delete Volume');

    return await this.userVolumeService.deleteUserVolume(volumeId, id);
  }
}
