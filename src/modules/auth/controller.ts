import { Controller, Logger, Inject, Post, Body } from '@nestjs/common';
import { I_AUTH_SERVICE } from '@shared/utils/constants';
import { TokenPayloadDTO } from './dto';
import { AuthServiceImpl } from './interface';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    @Inject(I_AUTH_SERVICE)
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
