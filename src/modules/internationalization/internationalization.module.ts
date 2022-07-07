import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { InternationalizationResolver } from './infra/graphql/internationalization.resolver';
import { InternationalizationRepository } from './infra/database/Internationalization.repository';
import { InternationalizationService } from './services';
import {
  INTERNATIONALIZATION_SERVICE,
  I_INTERNATIONALIZATION_REPOSITORY,
} from '@shared/utils/constants';
import { LiteraryWorkModule } from '@modules/literaryWork/literaryWork.module';
import { VolumeModule } from '@modules/volumes/volume.module';

const internationalizationServiceProvider: Provider = {
  provide: INTERNATIONALIZATION_SERVICE,
  useClass: InternationalizationService,
};
const internationalizationRepositoryProvider: Provider = {
  provide: I_INTERNATIONALIZATION_REPOSITORY,
  useClass: InternationalizationRepository,
};

@Module({
  imports: [
    LiteraryWorkModule,
    VolumeModule,
    TypeOrmModule.forFeature([InternationalizationRepository]),
  ],
  providers: [
    InternationalizationResolver,
    internationalizationServiceProvider,
    internationalizationRepositoryProvider,
  ],
  exports: [
    internationalizationServiceProvider,
    internationalizationRepositoryProvider,
  ],
})
export class InternationalizationModule {}
