import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTServiceImp } from '../domain/auth/interface';

@Injectable()
export class AuthJWTService implements JWTServiceImp {
  private readonly logger = new Logger(AuthJWTService.name);

  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    this.logger.log(JSON.stringify(payload));

    return this.jwtService.sign(payload);
  }
}
