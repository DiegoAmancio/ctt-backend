import { GqlAuthGuard } from '@domain/jwt/gql-auth.guard';
import { Role } from '@domain/jwt/role.enum';
import { Roles } from '@domain/jwt/roles.decorator';
import { RolesGuard } from '@domain/jwt/roles.guard';
import { InternationalizationServiceInterface } from '@modules/internationalization/interfaces';
import { UseGuards, Logger, Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { INTERNATIONALIZATION_SERVICE } from '@shared/utils/constants';
import {
  InternationalizationType,
  CreateInternationalizationInput,
  UpdateInternationalizationInput,
} from './types';

@Resolver(() => InternationalizationType)
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class InternationalizationResolver {
  private readonly logger = new Logger('Internationalization resolver');
  constructor(
    @Inject(INTERNATIONALIZATION_SERVICE)
    private readonly internationalizationService: InternationalizationServiceInterface,
  ) {}

  @Query(() => InternationalizationType)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async internationalization(
    @Args('id') id: string,
  ): Promise<InternationalizationType> {
    this.logger.log('Internationalization');

    return this.internationalizationService.getInternationalization(id);
  }
  @Mutation(() => InternationalizationType)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createInternationalization(
    @Args('input') input: CreateInternationalizationInput,
  ): Promise<InternationalizationType> {
    this.logger.log('Update Internationalization');

    const message =
      await this.internationalizationService.createInternationalization(input);
    return message;
  }
  @Mutation(() => String)
  async updateInternationalization(
    @Args('input') input: UpdateInternationalizationInput,
  ): Promise<string> {
    this.logger.log('Update Internationalization');

    const message =
      await this.internationalizationService.updateInternationalization(input);
    return message;
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteInternationalization(@Args('id') id: string): Promise<boolean> {
    this.logger.log('Delete Internationalization');

    return await this.internationalizationService.deleteInternationalization(
      id,
    );
  }
}
