import { UserModule } from '@modules/user/user.module';
import { Module, Provider } from '@nestjs/common';
import { AuthResolver } from './infra/graphql/resolver/login.resolver';
import { JWTModule } from './jwt/jwt.module';
import { AuthJWTService } from './jwt/jwt.service';
import { AuthService } from './services';

const authServiceProvider: Provider = {
  provide: 'IAuthService',
  useClass: AuthService,
};
const authJWTServiceProvider: Provider = {
  provide: 'IAuthJWTService',
  useClass: AuthJWTService,
};
@Module({
  imports: [JWTModule, UserModule],
  providers: [AuthResolver, authServiceProvider, authJWTServiceProvider],
  exports: [authServiceProvider, authJWTServiceProvider],
})
export class AuthModule {}
