import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { UserType, CreateUserInput, UpdateUserInput } from './types';
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard';
import { CurrentUser } from '@modules/auth/current-user.decorator';
import { UpdateUserDTO, UserTokenDTO } from '@modules/user/Dto';
import { IUserService } from '@modules/user/interfaces';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}
  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  async user(
    @CurrentUser() userTokenData: UserTokenDTO,
    @Args('email', { nullable: true }) email?: string,
  ): Promise<UserType> {
    return this.userService.getUser({ email: email }, userTokenData);
  }
  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserType> {
    return this.userService.createUser(input);
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() userTokenData: UserTokenDTO,
    @Args('input') input: UpdateUserInput,
  ): Promise<string> {
    const message = await this.userService.updateUser(
      input as UpdateUserDTO,
      userTokenData,
    );
    return message;
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteUser(
    @CurrentUser() userTokenData: UserTokenDTO,
  ): Promise<boolean> {
    return await this.userService.deleteUser({ id: userTokenData.id });
  }
}
