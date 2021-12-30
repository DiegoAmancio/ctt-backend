import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth/google')
export class GoogleOauthController {
  @Get()
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return res.status(200).send('pops');
  }
}
