import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { InternationalizationResolver } from './infra/graphql/internationalization.resolver';
import { InternationalizationRepository } from './infra/database/Internationalization.repository';
import { InternationalizationService } from './services';
import { INTERNATIONALIZATION_SERVICE } from '@shared/utils/constants';
import { LiteraryWorkModule } from '@modules/literaryWork/literaryWork.module';

const InternationalizationServiceProvider: Provider = {
  provide: INTERNATIONALIZATION_SERVICE,
  useClass: InternationalizationService,
};

@Module({
  imports: [
    LiteraryWorkModule,
    TypeOrmModule.forFeature([InternationalizationRepository]),
  ],
  providers: [
    InternationalizationResolver,
    InternationalizationServiceProvider,
  ],
  exports: [InternationalizationServiceProvider],
})
export class InternationalizationModule {}
