import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`,
    });
  }
  async validate(payload: {
    id: string;
    role: string;
    email: string;
    name: string;
    iat: string;
    exp: string;
  }) {
    return {
      id: payload.id,
      role: payload.role,
      email: payload.email,
    };
  }
}
