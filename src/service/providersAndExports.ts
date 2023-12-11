import { Provider } from '@nestjs/common';
import {
  AUTHOR_SERVICE,
  AUTH_JWT_SERVICE,
  AUTH_SERVICE,
} from '@shared/utils/constants';
import { AuthorService } from './author';
import { AuthService } from './auth';
import { AuthJWTService } from './jwt';
import { JwtStrategy } from '@domain/jwt/jwt.strategy';

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

export const providersAndExports = [
  authorServiceProvider,
  authServiceProvider,
  jwtServiceProvider,
  JwtStrategy,
];
