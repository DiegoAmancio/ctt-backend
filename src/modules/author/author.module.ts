import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { AuthorResolver } from './infra/graphql/author.resolver';
import { AuthorRepository } from './infra/database/author.repository';
import { AuthorService } from './services';
import { I_AUTHOR_REPOSITORY, I_AUTHOR_SERVICE } from '@shared/utils/constants';
import { UserModule } from '@modules/user/user.module';

const authorServiceProvider: Provider = {
  provide: I_AUTHOR_SERVICE,
  useClass: AuthorService,
};
const authorRepositoryProvider: Provider = {
  provide: I_AUTHOR_REPOSITORY,
  useClass: AuthorRepository,
};
@Module({
  imports: [UserModule, TypeOrmModule.forFeature([AuthorRepository])],
  providers: [AuthorResolver, authorServiceProvider, authorRepositoryProvider],
  exports: [authorServiceProvider, authorRepositoryProvider],
})
export class AuthorModule {}
