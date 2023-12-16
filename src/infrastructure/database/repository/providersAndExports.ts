import { Provider } from '@nestjs/common';
import { AuthorRepository } from './author';
import { AUTHOR_REPOSITORY, USER_REPOSITORY } from '@shared/utils/constants';
import { UserRepository } from './user';

const authorRepositoryProvider: Provider = {
  provide: AUTHOR_REPOSITORY,
  useClass: AuthorRepository,
};
const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepository,
};

export const providersAndExports = [
  authorRepositoryProvider,
  userRepositoryProvider,
];
