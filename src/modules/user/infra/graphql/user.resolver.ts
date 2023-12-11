import { CurrentUser } from '@domain/jwt/current-user.decorator';
import { GqlAuthGuard } from '@domain/jwt/gql-auth.guard';
import { UserTokenDTO, UpdateUserDTO } from '@modules/user/Dto';
import { IUserService } from '@modules/user/interfaces';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { I_USER_SERVICE } from '@shared/utils/constants';
import { UserType, UpdateUserInput } from './types';

@Resolver(() => UserType)
export class UserResolver {
  private readonly logger = new Logger('User resolver');
  constructor(
    @Inject(I_USER_SERVICE)
    private readonly userService: IUserService,
  ) {}
  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  async user(@CurrentUser() { id }: UserTokenDTO): Promise<UserType> {
    this.logger.log('user');

    return this.userService.getUser(id);
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() userTokenData: UserTokenDTO,
    @Args('input') input: UpdateUserInput,
  ): Promise<string> {
    this.logger.log('Update user');

    const message = await this.userService.updateUser(
      input as UpdateUserDTO,
      userTokenData,
    );
    return message;
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@CurrentUser() { id }: UserTokenDTO): Promise<boolean> {
    this.logger.log('Delete user');

    return await this.userService.deleteUser(id);
  }
}
