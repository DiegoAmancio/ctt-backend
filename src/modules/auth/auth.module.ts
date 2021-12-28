import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JWTModule } from './jwt/jwt.module';

@Module({
  imports: [JWTModule, UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
