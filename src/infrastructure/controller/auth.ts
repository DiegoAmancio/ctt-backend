import { Controller, Logger, Inject, Post, Body } from '@nestjs/common';
import { AUTH_SERVICE } from '@shared/utils/constants';
import { TokenPayloadDTO } from '../../domain/auth/dto';
import { AuthServiceImpl } from '../../domain/auth/interface';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: AuthServiceImpl,
  ) {}

  @Post('/')
  async loginUser(
    @Body() { reqTokenId }: { reqTokenId: string },
  ): Promise<TokenPayloadDTO> {
    this.logger.log('user');
    return this.authService.generateToken(reqTokenId);
  }
}
