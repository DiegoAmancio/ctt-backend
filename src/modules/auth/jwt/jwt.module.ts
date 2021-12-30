import { UserModule } from '@modules/user/user.module';
import { Module, Provider } from '@nestjs/common';
import { JwtModule as module } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthJWTService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

const authServiceProvider: Provider = {
  provide: 'IAuthService',
  useClass: AuthJWTService,
};
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    module.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '36000s' },
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, authServiceProvider],
  exports: [PassportModule, module, authServiceProvider],
})
export class JWTModule {}
