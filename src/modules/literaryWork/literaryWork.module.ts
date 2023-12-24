import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { LiteraryWorkResolver } from './infra/graphql/literaryWork.resolver';
import { LiteraryWorkRepository } from '../../infrastructure/database/repository/literaryWork';
import { LiteraryWorkService } from './services';
import {
  LITERARY_WORK_REPOSITORY,
  I_LITERARY_WORK_SERVICE,
} from '@shared/utils/constants';
import { Volume } from '@modules/volumes/infra/database';
import { LiteraryWork } from './infra/database';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { ServiceModule } from '@service/service.module';

const LiteraryWorkServiceProvider: Provider = {
  provide: I_LITERARY_WORK_SERVICE,
  useClass: LiteraryWorkService,
};
export const LiteraryWorkRepositoryProvider: Provider = {
  provide: LITERARY_WORK_REPOSITORY,
  useClass: LiteraryWorkRepository,
};

@Module({
  imports: [
    ServiceModule,
    TypeOrmModule.forFeature([LiteraryWork, Volume]),
    DatabaseModule,
  ],
  providers: [
    LiteraryWorkResolver,
    LiteraryWorkServiceProvider,
    LiteraryWorkRepositoryProvider,
  ],
  exports: [LiteraryWorkServiceProvider, LiteraryWorkRepositoryProvider],
})
export class LiteraryWorkModule {}
