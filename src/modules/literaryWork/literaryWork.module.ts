import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { LiteraryWorkResolver } from './infra/graphql/literaryWork.resolver';
import { LiteraryWorkRepository } from './infra/database/literaryWork.repository';
import { LiteraryWorkService } from './services';
import {
  I_LITERARY_WORK_REPOSITORY,
  I_LITERARY_WORK_SERVICE,
} from '@shared/utils/constants';
import { UserModule } from '@modules/user/user.module';
import { AuthorModule } from '@modules/author/author.module';
import { Volume } from '@modules/volumes/infra/database';
import { LiteraryWork } from './infra/database';
import { MyCollectionModule } from '@modules/myCollection/myCollection.module';

const LiteraryWorkServiceProvider: Provider = {
  provide: I_LITERARY_WORK_SERVICE,
  useClass: LiteraryWorkService,
};
const LiteraryWorkRepositoryProvider: Provider = {
  provide: I_LITERARY_WORK_REPOSITORY,
  useClass: LiteraryWorkRepository,
};

@Module({
  imports: [
    UserModule,
    AuthorModule,
    MyCollectionModule,
    TypeOrmModule.forFeature([LiteraryWork, Volume]),
  ],
  providers: [
    LiteraryWorkResolver,
    LiteraryWorkServiceProvider,
    LiteraryWorkRepositoryProvider,
  ],
  exports: [LiteraryWorkServiceProvider, LiteraryWorkRepositoryProvider],
})
export class LiteraryWorkModule {}
