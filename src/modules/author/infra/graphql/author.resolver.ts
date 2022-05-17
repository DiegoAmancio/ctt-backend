import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Logger, Inject, UseGuards } from '@nestjs/common';
import { UpdateAuthorInput, AuthorType } from './types';
import { GqlAuthGuard } from '@modules/auth/jwt/gql-auth.guard';
import { UpdateAuthorDTO } from '@modules/author/Dto';
import { IAuthorService } from '@modules/author/interfaces';
import { I_AUTHOR_SERVICE } from '@shared/utils/constants';

@Resolver(() => AuthorType)
export class AuthorResolver {
  private readonly logger = new Logger('Author resolver');
  constructor(
    @Inject(I_AUTHOR_SERVICE)
    private readonly authorService: IAuthorService,
  ) {}
  @Query(() => AuthorType)
  @UseGuards(GqlAuthGuard)
  async Author(): Promise<AuthorType> {
    this.logger.log('Author');

    return this.authorService.getAuthor(null);
  }
  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async updateAuthor(@Args('input') input: UpdateAuthorInput): Promise<string> {
    this.logger.log('Update Author');

    const message = await this.authorService.updateAuthor(
      input as UpdateAuthorDTO,
    );
    return message;
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteAuthor(@Args('id') id: string): Promise<boolean> {
    this.logger.log('Delete Author');

    return await this.authorService.deleteAuthor(id);
  }
}
