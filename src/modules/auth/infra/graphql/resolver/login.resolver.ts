import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Logger, Inject } from '@nestjs/common';
import { TokenType, LoginInput } from '../types';
import { IAuthService } from '@modules/auth/interfaces';

@Resolver(() => TokenType)
export class AuthResolver {
  private readonly logger = new Logger('Login resolver');
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}
  @Mutation(() => TokenType)
  async loginUser(@Args('input') input: LoginInput): Promise<TokenType> {
    this.logger.log('user');
    return this.authService.generateToken(input);
  }
}
