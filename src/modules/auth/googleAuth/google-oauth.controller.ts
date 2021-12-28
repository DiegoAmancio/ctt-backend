import { AuthService } from '@modules/auth/jwt/jwt.service';
import {
  Controller,
  Get,
  Inject,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-auth.guard';

@Controller('auth/google')
export class GoogleOauthController {
  private readonly logger = new Logger('GoogleOauthController');

  constructor(
    @Inject('IAuthService')
    private readonly jwtAuthService: AuthService,
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    this.logger.log('logging ' + JSON.stringify(req.user));

    const { accessToken } = await this.jwtAuthService.login(req.user);
    this.logger.log(accessToken);
    return res.status(200).send({ token: accessToken, user: req.user });
  }
}
