import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { GetUserLiteraryWorksType, LiteraryWorkType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { ILiteraryWorkService } from '@modules/LiteraryWork/interfaces';
import { I_LITERARY_WORK_SERVICE } from '@shared/utils/constants';
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
import {
  getAllAuthorLiteraryWork,
  getAllLiteraryWork,
} from '@modules/LiteraryWork/dto';
import { Language } from '@shared/enum';

@Resolver(() => LiteraryWorkType)
export class LiteraryWorkResolver {
  private readonly logger = new Logger('LiteraryWork resolver');
  constructor(
    @Inject(I_LITERARY_WORK_SERVICE)
    private readonly LiteraryWorkService: ILiteraryWorkService,
  ) {}
  @Query(() => [LiteraryWorkType])
  async getAllLiteraryWorks(
    @Args('input') data: getAllLiteraryWork,
  ): Promise<LiteraryWorkType[]> {
    this.logger.log('LiteraryWork');

    return this.LiteraryWorkService.getAllLiteraryWork(data);
  }
  @Query(() => [LiteraryWorkType])
  async getAllAuthorLiteraryWorks(
    @Args('input') data: getAllAuthorLiteraryWork,
  ): Promise<LiteraryWorkType[]> {
    this.logger.log('LiteraryWork');

    return this.LiteraryWorkService.getAllAuthorLiteraryWork(data);
  }
  @Query(() => GetUserLiteraryWorksType)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  async getUserLiteraryWorks(
    @CurrentUser() { id },
    @Args({ name: 'language', type: () => Language }) language: Language,
  ): Promise<GetUserLiteraryWorksType> {
    this.logger.log('getUserLiteraryWorks');

    return this.LiteraryWorkService.getUserLiteraryWorks(id, language);
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
