import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { AuthorResolver } from './infra/graphql/author.resolver';
import { AuthorRepository } from './infra/database/user.repository';
import { AuthorService } from './services';
import { I_USER_SERVICE } from '@shared/utils/constants';

const userServiceProvider: Provider = {
  provide: I_USER_SERVICE,
  useClass: AuthorService,
};

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  providers: [AuthorResolver, userServiceProvider],
  exports: [userServiceProvider],
})
export class UserModule {}
