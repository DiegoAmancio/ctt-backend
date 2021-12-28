import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('Auth service');

  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    this.logger.log(JSON.stringify(user));
    const payload: any = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
