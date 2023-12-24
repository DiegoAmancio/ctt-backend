import { Provider } from '@nestjs/common';
import { AuthorRepository } from './author';
import {
  AUTHOR_REPOSITORY,
  INTERNATIONALIZATION_REPOSITORY,
  USER_REPOSITORY,
} from '@shared/utils/constants';
import { UserRepository } from './user';
import { InternationalizationRepository } from './internationalization';

const authorRepositoryProvider: Provider = {
  provide: AUTHOR_REPOSITORY,
  useClass: AuthorRepository,
};
const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepository,
};

const internationalizationProvider: Provider = {
  provide: INTERNATIONALIZATION_REPOSITORY,
  useClass: InternationalizationRepository,
};
export const providersAndExports = [
  authorRepositoryProvider,
  userRepositoryProvider,
  internationalizationProvider,
];
