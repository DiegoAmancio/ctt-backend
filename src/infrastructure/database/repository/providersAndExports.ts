import { Provider } from '@nestjs/common';
import { AuthorRepository } from './author';
import {
  AUTHOR_REPOSITORY,
  INTERNATIONALIZATION_REPOSITORY,
  VOLUME_REPOSITORY,
  LITERARY_WORK_REPOSITORY,
  USER_REPOSITORY,
} from '@shared/utils/constants';
import { UserRepository } from './user';
import { InternationalizationRepository } from './internationalization';
import { LiteraryWorkRepository } from './literaryWork';
import { VolumeRepository } from './volume';

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

export const literaryWorkRepositoryProvider: Provider = {
  provide: LITERARY_WORK_REPOSITORY,
  useClass: LiteraryWorkRepository,
};

export const volumeRepositoryProvider: Provider = {
  provide: VOLUME_REPOSITORY,
  useClass: VolumeRepository,
};
export const providersAndExports = [
  authorRepositoryProvider,
  userRepositoryProvider,
  internationalizationProvider,
  literaryWorkRepositoryProvider,
  volumeRepositoryProvider,
];
