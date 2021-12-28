import { JWTModule } from '@modules/auth/jwt/jwt.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';

@Module({
  imports: [JWTModule, UserModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
