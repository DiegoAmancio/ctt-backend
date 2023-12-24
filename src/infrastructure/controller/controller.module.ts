import { Module } from '@nestjs/common';
import { RolesGuard } from '@domain/jwt/roles.guard';
import { ServiceModule } from '@service/service.module';
import { AuthController } from './auth';
import { AuthorController } from './author';
import { UserController } from './user';
import { InternationalizationController } from './internationalization';

@Module({
  imports: [ServiceModule],
  providers: [RolesGuard],
  controllers: [
    AuthController,
    AuthorController,
    UserController,
    InternationalizationController,
  ],
})
export class ControllerModule {}
