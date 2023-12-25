import { Module } from '@nestjs/common';
import { RolesGuard } from '@domain/jwt/roles.guard';
import { ServiceModule } from '@service/service.module';
import { AuthController } from './auth';
import { AuthorController } from './author';
import { UserController } from './user';
import { InternationalizationController } from './internationalization';
import { LiteraryWorkController } from './literaryWork';
import { VolumeController } from './volume';
import { UserVolumeController } from './userVolume';

@Module({
  imports: [ServiceModule],
  providers: [RolesGuard],
  controllers: [
    AuthController,
    AuthorController,
    UserController,
    InternationalizationController,
    LiteraryWorkController,
    VolumeController,
    UserVolumeController,
  ],
})
export class ControllerModule {}
