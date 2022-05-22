import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { MyCollectionType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IMyCollectionService } from '@modules/myCollection/interfaces';
import { I_MY_COLLECTION_SERVICE } from '@shared/utils/constants';
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
    this.logger.log('MyCollection');

    return this.myCollectionService.getMyCollection(id);
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async deleteMyCollection(
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<boolean> {
    this.logger.log('Delete MyCollection');

    return await this.myCollectionService.deleteMyCollection(id);
  }
}
