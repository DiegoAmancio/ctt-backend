import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { LiteraryWorkResolver } from './infra/graphql/literaryWork.resolver';
import { LiteraryWorkRepository } from './infra/database/literaryWork.repository';
import { LiteraryWorkService } from './services';
import { I_LITERARYWORK_SERVICE } from '@shared/utils/constants';
import { UserModule } from '@modules/user/user.module';
import { InternationalizationModule } from '@modules/internationalization/internationalization.module';

const LiteraryWorkServiceProvider: Provider = {
  provide: I_LITERARYWORK_SERVICE,
  useClass: LiteraryWorkService,
};

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([LiteraryWorkRepository])],
  providers: [LiteraryWorkResolver, LiteraryWorkServiceProvider],
  exports: [LiteraryWorkServiceProvider],
})
export class LiteraryWorkModule {}
