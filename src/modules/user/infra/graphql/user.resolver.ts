import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { UpdateUserInput, UserType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { CurrentUser } from '@modules/auth/jwt/current-user.decorator';
import { IUserService } from '@modules/user/interfaces';
import { I_USER_SERVICE } from '@shared/utils/constants';
import { UpdateUserDTO } from '@modules/user/dto/updateUser.dto';
import { UserTokenDTO } from '../../dto/userToken.dto';

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
