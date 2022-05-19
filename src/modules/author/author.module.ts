import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { AuthorResolver } from './infra/graphql/author.resolver';
import { AuthorRepository } from './infra/database/author.repository';
import { AuthorService } from './services';
import { I_AUTHOR_SERVICE } from '@shared/utils/constants';

const authorServiceProvider: Provider = {
  provide: I_AUTHOR_SERVICE,
  useClass: AuthorService,
};

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  providers: [AuthorResolver, authorServiceProvider],
  exports: [authorServiceProvider],
})
export class AuthorModule {}
