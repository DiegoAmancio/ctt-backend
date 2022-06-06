import {
  Resolver,
  Args,
  Query,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import {
  UpdateLiteraryWorkInput,
  LiteraryWorkType,
  CreateLiteraryWorkInput,
  LiteraryWorkInternationalizationType,
} from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { ILiteraryWorkService } from '@modules/LiteraryWork/interfaces';
import {
  INTERNATIONALIZATION_SERVICE,
  I_LITERARYWORK_SERVICE,
} from '@shared/utils/constants';
import { RolesGuard } from '@modules/auth/jwt/roles.guard';
import { Role } from '@modules/auth/jwt/role.enum';
import { Roles } from '@modules/auth/jwt/roles.decorator';
import { CurrentUser } from '@modules/auth/jwt/current-user.decorator';
import { UserTokenDTO } from '@modules/user/Dto';
import { InternationalizationServiceInterface } from '@modules/Internationalization/interfaces';
import { Internationalization } from '@modules/Internationalization/infra/database';
import { Language } from '@shared/enum';

@Resolver(() => LiteraryWorkType)
export class LiteraryWorkResolver {
  private readonly logger = new Logger('LiteraryWork resolver');
  constructor(
    @Inject(I_LITERARYWORK_SERVICE)
    private readonly LiteraryWorkService: ILiteraryWorkService,
    @Inject(INTERNATIONALIZATION_SERVICE)
    private readonly internationalizationService: InternationalizationServiceInterface,
  ) {}
  @Query(() => LiteraryWorkType)
  async LiteraryWork(@Args('id') id: string): Promise<LiteraryWorkType> {
    this.logger.log('LiteraryWork');

    return this.LiteraryWorkService.getLiteraryWork(id);
  }

  @ResolveField(() => LiteraryWorkInternationalizationType, { nullable: true })
  async pageInfo(
    @Parent() literaryWork: LiteraryWorkType,
    @Args('language') language: Language,
  ): Promise<LiteraryWorkInternationalizationType> {
    const internationalization =
      await this.internationalizationService.getInternationalizationByLiteraryWork(
        { ...literaryWork, internationalization: [] },
        language,
      );

    return internationalization;
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
