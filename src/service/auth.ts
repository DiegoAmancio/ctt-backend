import { IUserService } from '@modules/user/interfaces';
import { Injectable, Logger, Inject, HttpException } from '@nestjs/common';
import { AUTH_JWT_SERVICE, I_USER_SERVICE } from '@shared/utils/constants';
import { TokenPayloadDTO, GoogleUserPayloadDTO } from '@domain/auth/dto';
import { AuthServiceImpl, JWTServiceImp } from '@domain/auth/interface';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService implements AuthServiceImpl {
  private readonly logger = new Logger(AuthService.name);
  private readonly oAuth2Client = new OAuth2Client(
    `${process.env.OAUTH_GOOGLE_ID}`,
    `${process.env.OAUTH_GOOGLE_SECRET}`,
    `${process.env.OAUTH_GOOGLE_REDIRECT_URL}`,
  );

  constructor(
    @Inject(AUTH_JWT_SERVICE)
    private readonly authService: JWTServiceImp,
    @Inject(I_USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  async generateToken(reqTokenId: string): Promise<TokenPayloadDTO> {
    this.logger.log('generateToken');

    const googleTokenResponse = await this.getUserByToken(reqTokenId);
    const getUser = await this.getUser(googleTokenResponse);

    const tokenPayload = {
      id: googleTokenResponse.id,
      email: googleTokenResponse.email,
      name: googleTokenResponse.name,
      role: getUser.role,
    };

    const token = await this.authService.generateToken(tokenPayload);

    return new TokenPayloadDTO({
      token,
      role: getUser.role,
      name: googleTokenResponse.name,
    });
  }

  private readonly getUser = async ({
    id,
    email,
    name,
  }: GoogleUserPayloadDTO): Promise<{
    id: string;
    role: string;
  }> => {
    const user = await this.userService
      .getUser(id)
      .catch(async (error: HttpException) => {
        if (error.getStatus() === 404) {
          return this.userService.createUser({
            id,
            email: email,
            name: name,
          });
        } else {
          throw error;
        }
      });
    return {
      id: user.id,
      role: user.role,
    };
  };

  private readonly getUserByToken = async (
    token: string,
  ): Promise<GoogleUserPayloadDTO> => {
    const { data } = await this.oAuth2Client.transporter.request({
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.GOOGLE_OAUTH_URL}?access_token=${token}`,
    });

    return {
      id: data['id'],
      email: data['email'],
      name: data['name'],
    };
  };
}
