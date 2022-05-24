import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { UpdateAuthorInput, AuthorType, CreateUserInput } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { IAuthorService } from '@modules/author/interfaces';
import { I_AUTHOR_SERVICE } from '@shared/utils/constants';
import { RolesGuard } from '@modules/auth/jwt/roles.guard';
import { Role } from '@modules/auth/jwt/role.enum';
import { Roles } from '@modules/auth/jwt/roles.decorator';
import { CurrentUser } from '@modules/auth/jwt/current-user.decorator';
import { UserTokenDTO } from '@modules/user/Dto';

@Resolver(() => AuthorType)
export class AuthorResolver {
  private readonly logger = new Logger('Author resolver');
  constructor(
    @Inject(I_AUTHOR_SERVICE)
    private readonly authorService: IAuthorService,
  ) {}
  @Query(() => AuthorType)
  async author(@Args('id') id: string): Promise<AuthorType> {
    this.logger.log('Author');

    return this.authorService.getAuthor(id);
  }
  @Mutation(() => AuthorType)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createAuthor(
    @Args('input') input: CreateUserInput,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<AuthorType> {
    this.logger.log('Update Author');

    const message = await this.authorService.createAuthor({
      ...input,
      adminId: id,
    });
    return message;
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async updateAuthor(
    @Args('input') input: UpdateAuthorInput,
    @CurrentUser() { id }: UserTokenDTO,
  ): Promise<string> {
    this.logger.log('Update Author');

    const message = await this.authorService.updateAuthor({
      ...input,
      adminId: id,
    });
    return message;
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  @Roles(Role.Admin)
  async deleteAuthor(@Args('id') id: string): Promise<boolean> {
    this.logger.log('Delete Author');

    return await this.authorService.deleteAuthor(id);
  }
}
