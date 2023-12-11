import { Provider } from '@nestjs/common';
import { AuthorRepository } from './author';
import { AUTHOR_REPOSITORY } from '@shared/utils/constants';

const authorRepositoryProvider: Provider = {
  provide: AUTHOR_REPOSITORY,
  useClass: AuthorRepository,
};

export const providersAndExports = [authorRepositoryProvider];
