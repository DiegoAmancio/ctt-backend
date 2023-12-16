import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { providersAndExports } from './providersAndExports';
import { JwtModule as module } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    module.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: providersAndExports,
  exports: providersAndExports,
})
export class ServiceModule {}
