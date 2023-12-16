import { Provider } from '@nestjs/common';
import {
  AUTHOR_SERVICE,
  AUTH_JWT_SERVICE,
  AUTH_SERVICE,
  USER_SERVICE,
} from '@shared/utils/constants';
import { AuthorService } from './author';
import { AuthService } from './auth';
import { AuthJWTService } from './jwt';
import { JwtStrategy } from '@domain/jwt/jwt.strategy';
import { UserService } from './user';

const authorServiceProvider: Provider = {
  provide: AUTHOR_SERVICE,
  useClass: AuthorService,
};
const authServiceProvider: Provider = {
  provide: AUTH_SERVICE,
  useClass: AuthService,
};
const jwtServiceProvider: Provider = {
  provide: AUTH_JWT_SERVICE,
  useClass: AuthJWTService,
};

const userServiceProvider: Provider = {
  provide: USER_SERVICE,
  useClass: UserService,
};

export const providersAndExports = [
  authorServiceProvider,
  authServiceProvider,
  jwtServiceProvider,
  JwtStrategy,
  userServiceProvider,
];
