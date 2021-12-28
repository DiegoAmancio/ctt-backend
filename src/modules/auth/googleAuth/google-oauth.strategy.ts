import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from '@modules/user/services';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger('GoogleOauthStrategy');
  constructor(
    @Inject('IUserService')
    private readonly usersService: UserService,
  ) {
    super({
      clientID: `${process.env.OAUTH_GOOGLE_ID}`,
      clientSecret: `${process.env.OAUTH_GOOGLE_SECRET}`,
      callbackURL: `${process.env.OAUTH_GOOGLE_REDIRECT_URL}`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails, photos } = profile;
    const photo = photos[0].value;
    this.logger.log('Validating - google ' + id);
    const user = await this.usersService
      .getUser({
        id: id,
      })
      .catch(() =>
        this.usersService.createUser({
          id: id,
          email: emails[0].value,
          name: name.givenName,
        }),
      );
    return {
      photo: photo,
      ...user,
    };
  }
}
