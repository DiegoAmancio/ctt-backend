import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { LiteraryWorkType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { ILiteraryWorkService } from '@modules/LiteraryWork/interfaces';
import { I_LITERARYWORK_SERVICE } from '@shared/utils/constants';
import { RolesGuard } from '@modules/auth/jwt/roles.guard';
import { Role } from '@modules/auth/jwt/role.enum';
import { Roles } from '@modules/auth/jwt/roles.decorator';
import { CurrentUser } from '@modules/auth/jwt/current-user.decorator';
import { UserTokenDTO } from '@modules/user/Dto';
import {
  GetLiteraryWorkInput,
  CreateLiteraryWorkInput,
  UpdateLiteraryWorkInput,
} from './inputs';
import { getAllLiteraryWork } from '@modules/LiteraryWork/dto';

@Resolver(() => LiteraryWorkType)
export class LiteraryWorkResolver {
  private readonly logger = new Logger('LiteraryWork resolver');
  constructor(
    @Inject(I_LITERARYWORK_SERVICE)
    private readonly LiteraryWorkService: ILiteraryWorkService,
  ) {}
  @Query(() => [LiteraryWorkType])
  async getAllLiteraryWorks(
    @Args('input') data: getAllLiteraryWork,
  ): Promise<LiteraryWorkType[]> {
    this.logger.log('LiteraryWork');

    return this.LiteraryWorkService.getAllLiteraryWork(data);
  }
  @Query(() => LiteraryWorkType)
  async LiteraryWork(
    @Args('input') { id, language }: GetLiteraryWorkInput,
  ): Promise<LiteraryWorkType> {
    this.logger.log('LiteraryWork');

    return this.LiteraryWorkService.getLiteraryWork(id, language);
  }

  @Mutation(() => LiteraryWorkType)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createLiteraryWork(
    @Args('input') input: CreateLiteraryWorkInput,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<LiteraryWorkType> {
    this.logger.log('Update LiteraryWork');

    const message = await this.LiteraryWorkService.createLiteraryWork({
      ...input,
      adminId: id,
    });
    return message;
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async updateLiteraryWork(
    @Args('input') input: UpdateLiteraryWorkInput,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('Update LiteraryWork');

    const message = await this.LiteraryWorkService.updateLiteraryWork({
      ...input,
      adminId: id,
    });
    return message;
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async deleteLiteraryWork(@Args('id') id: string): Promise<boolean> {
    this.logger.log('Delete LiteraryWork');

    return await this.LiteraryWorkService.deleteLiteraryWork(id);
  }
}
