import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@modules/user/infra/database/user.entity';
import { comparePassword } from '@shared/utils/password';
import { IUserService } from '@modules/user/interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('Auth service');

  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> {
    this.logger.log('validate: ' + email);
    const user = await this.userService.getUser({ email: email }, null);

    if (!user) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const isSamePassword = comparePassword(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException('Incorrect Email or password');
    }
    return user;
  }

  login(user: User): { access_token: string; name: string } {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      name: user.name,
    };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.userService.getUser(
      { email: decoded.email },
      decoded,
    );

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }
}
