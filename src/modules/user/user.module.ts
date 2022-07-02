import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { UserResolver } from './infra/graphql/user.resolver';
import { UserRepository } from './infra/database/user.repository';
import { UserService } from './services';
import { I_USER_REPOSITORY, I_USER_SERVICE } from '@shared/utils/constants';

const userServiceProvider: Provider = {
  provide: I_USER_SERVICE,
  useClass: UserService,
};
const userRepositoryProvider: Provider = {
  provide: I_USER_REPOSITORY,
  useClass: UserRepository,
};
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserResolver, userServiceProvider, userRepositoryProvider],
  exports: [userServiceProvider, userRepositoryProvider],
})
export class UserModule {}
