import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@modules/user/infra/typeorm/user.entity';
import { IUserService } from '@modules/user/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`,
    });
  }

  validate(validationPayload: { id: string; email: string }): Promise<User> {
    return this.userService.getUser(
      {
        id: validationPayload.id,
        email: validationPayload.email,
      },
      null,
    );
  }
}
