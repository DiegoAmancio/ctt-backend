import { UserModule } from '@modules/user/user.module';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModule as module } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { I_AUTH_JWT_SERVICE } from '@shared/utils/constants';
import { AuthJWTService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

const authServiceProvider: Provider = {
  provide: I_AUTH_JWT_SERVICE,
  useClass: AuthJWTService,
};
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '36000s' },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  providers: [JwtStrategy, authServiceProvider],
  exports: [PassportModule, module, authServiceProvider],
})
export class JWTModule {}
