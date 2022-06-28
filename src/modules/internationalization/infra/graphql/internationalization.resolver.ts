import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import {
  UpdateInternationalizationInput,
  InternationalizationType,
  CreateInternationalizationInput,
} from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { InternationalizationServiceInterface } from '@modules/Internationalization/interfaces';
import { INTERNATIONALIZATION_SERVICE } from '@shared/utils/constants';
import { RolesGuard } from '@modules/auth/jwt/roles.guard';
import { Role } from '@modules/auth/jwt/role.enum';
import { Roles } from '@modules/auth/jwt/roles.decorator';

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
  async internationalization(
    @Args('id') id: string,
  ): Promise<InternationalizationType> {
    this.logger.log('Internationalization');

    return this.internationalizationService.getInternationalization(id);
  }
  @Mutation(() => InternationalizationType)
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
  async deleteInternationalization(@Args('id') id: string): Promise<boolean> {
    this.logger.log('Delete Internationalization');

    return await this.internationalizationService.deleteInternationalization(
      id,
    );
  }
}
