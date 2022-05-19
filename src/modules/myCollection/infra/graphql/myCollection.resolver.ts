import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { MyCollectionType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IMyCollectionService } from '@modules/myCollection/interfaces';
import { I_MY_COLLECTION_SERVICE } from '@shared/utils/constants';
import { RolesGuard } from '@modules/auth/jwt/roles.guard';
import { Role } from '@modules/auth/jwt/role.enum';
import { Roles } from '@modules/auth/jwt/roles.decorator';
import { CurrentUser } from '@modules/auth/jwt/current-user.decorator';
import { UserTokenDTO } from '@modules/user/Dto';

@Resolver(() => MyCollectionType)
export class MyCollectionResolver {
  private readonly logger = new Logger('My Collection resolver');
  constructor(
    @Inject(I_MY_COLLECTION_SERVICE)
    private readonly myCollectionService: IMyCollectionService,
  ) {}
  @Query(() => MyCollectionType)
  @UseGuards(GqlAuthGuard)
  async myCollection(
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<MyCollectionType> {
    this.logger.log('Author');

    return this.myCollectionService.getMyCollection(id);
  }
  @Mutation(() => MyCollectionType)
  @UseGuards(GqlAuthGuard)
  async createAuthor(
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<MyCollectionType> {
    this.logger.log('Update Author');

    const message = await this.myCollectionService.createMyCollection(id);
    return message;
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async deleteAuthor(@CurrentUser() { id }: UserTokenDTO): Promise<boolean> {
    this.logger.log('Delete Author');

    return await this.myCollectionService.deleteMyCollection(id);
  }
}
