import { Provider } from '@nestjs/common';
import {
  AUTHOR_SERVICE,
  AUTH_JWT_SERVICE,
  AUTH_SERVICE,
  INTERNATIONALIZATION_SERVICE,
  LITERARY_WORK_SERVICE,
  USER_SERVICE,
} from '@shared/utils/constants';
import { AuthorService } from './author';
import { AuthService } from './auth';
import { AuthJWTService } from './jwt';
import { JwtStrategy } from '@domain/jwt/jwt.strategy';
import { UserService } from './user';
import { InternationalizationService } from './internationalization';
import { LiteraryWorkService } from './literaryWork';

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

const internationalizationServiceProvider: Provider = {
  provide: INTERNATIONALIZATION_SERVICE,
  useClass: InternationalizationService,
};

const literaryWorkServiceProvider: Provider = {
  provide: LITERARY_WORK_SERVICE,
  useClass: LiteraryWorkService,
};

export const providersAndExports = [
  authorServiceProvider,
  authServiceProvider,
  jwtServiceProvider,
  JwtStrategy,
  userServiceProvider,
  internationalizationServiceProvider,
  literaryWorkServiceProvider,
];
