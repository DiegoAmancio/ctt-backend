import { Provider, Module } from '@nestjs/common';
import { I_AUTH_SERVICE, I_AUTH_JWT_SERVICE } from '@shared/utils/constants';
import { GqlOpenAuthGuard } from './jwt/gql-open-auth.guard';
import { JWTModule } from './jwt/jwt.module';
import { AuthJWTService } from './jwt/jwt.service';
import { RolesGuard } from './jwt/roles.guard';
import { AuthService } from './service';
import { AuthController } from './controller';
import { UserModule } from '@modules/user/user.module';

const authServiceProvider: Provider = {
  provide: I_AUTH_SERVICE,
  useClass: AuthService,
};
const authJWTServiceProvider: Provider = {
  provide: I_AUTH_JWT_SERVICE,
  useClass: AuthJWTService,
};
@Module({
  imports: [JWTModule, UserModule],
  providers: [
    authServiceProvider,
    authJWTServiceProvider,
    RolesGuard,
    GqlOpenAuthGuard,
  ],
  controllers: [AuthController],
  exports: [authServiceProvider, authJWTServiceProvider],
})
export class AuthModule {}
