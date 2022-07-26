import { UserService } from '@modules/user/services';
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { I_AUTH_JWT_SERVICE, I_USER_SERVICE } from '@shared/utils/constants';
import { OAuth2Client } from 'google-auth-library';
import { TokenDataDTO } from '../dto/tokendata.dto';
import { TokenDataInputDTO } from '../dto/tokenDataInput.dto';
import { IAuthService } from '../interfaces';
import { AuthJWTService } from '../jwt/jwt.service';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger('Auth service');
  private readonly oAuth2Client = new OAuth2Client(
    `${process.env.OAUTH_GOOGLE_ID}`,
    `${process.env.OAUTH_GOOGLE_SECRET}`,
    `${process.env.OAUTH_GOOGLE_REDIRECT_URL}`,
  );

  constructor(
    @Inject(I_AUTH_JWT_SERVICE)
    private readonly authService: AuthJWTService,
    @Inject(I_USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  async generateToken({
    reqTokenId,
  }: TokenDataInputDTO): Promise<TokenDataDTO> {
    this.logger.log('generateToken');

    const { id, email, name } = await this.getUserByToken(reqTokenId);
    const getUser = await this.getUser(id, email, name);
    const payload = {
      id: id,
      role: getUser.role,
      email: email,
      name: name,
    };
    const token = {
      token: await this.authService.generateToken(payload),
      role: getUser.role,
      name: name,
    };

    return token;
  }

  /**
   * get user by id, if user doesn't exist create user and return info
   * @param sub user Id
   * @param email user email
   * @param name user name
   * @returns object with user id and if is admin
   */
  private readonly getUser = async (
    sub: string,
    email: string,
    name: string,
  ): Promise<{ id: string; role: string }> => {
    const { id, role } = await this.userService
      .getUser(sub)
      .catch(async (error: HttpException) => {
        if (error.getStatus() === 404) {
          return this.userService.createUser({
            id: sub,
            email: email,
            name: name,
          });
        } else {
          throw error;
        }
      });
    return {
      id: id,
      role: role,
    };
  };

  private readonly getUserByToken = async (
    token: string,
  ): Promise<{ id: string; email: string; name: string }> => {
    const { data } = await this.oAuth2Client.transporter.request({
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      url: `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`,
    });

    return {
      id: data['id'],
      email: data['email'],
      name: data['name'],
    };
  };
}
