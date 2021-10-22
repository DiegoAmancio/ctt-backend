import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { UserResolver } from './infra/graphql/user.resolver';
import { UserRepository } from './infra/typeorm/user.repository';
import { UserService } from './services';

const userServiceProvider: Provider = {
  provide: 'IUserService',
  useClass: UserService,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserResolver, userServiceProvider],
  exports: [userServiceProvider],
})
export class UserModule {}
