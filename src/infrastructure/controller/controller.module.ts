// const authServiceProvider: Provider = {
//   provide: AUTH_SERVICE,
//   useClass: AuthService,
// };
// const authJWTServiceProvider: Provider = {
//   provide: AUTH_JWT_SERVICE,
//   useClass: AuthJWTService,
// };

import { Module } from '@nestjs/common';
import { RolesGuard } from '@domain/jwt/roles.guard';
import { ServiceModule } from '@service/service.module';
import { AuthController } from './auth';
import { AuthorController } from './author';
import { UserController } from './user';

@Module({
  imports: [ServiceModule],
  providers: [RolesGuard],
  controllers: [AuthController, AuthorController, UserController],
})
export class ControllerModule {}
