import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { LiteraryWorkModule } from '@modules/literaryWork/literaryWork.module';
import { HttpModule } from '@nestjs/axios';
import { Provider, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  I_VOLUME_SERVICE,
  I_VOLUME_REPOSITORY,
  I_USER_VOLUME_SERVICE,
  I_USER_VOLUME_REPOSITORY,
} from '@shared/utils/constants';
import {
  VolumeRepository,
  UserVolumeRepository,
  Volume,
  UserVolume,
} from './infra/database';
import { UserVolumeResolver } from './infra/graphql/userVolume.resolver';
import { VolumeResolver } from './infra/graphql/volume.resolver';
import { VolumeService, UserVolumeService } from './services';
import { ServiceModule } from '@service/service.module';
import { DatabaseModule } from '@infrastructure/database/database.module';

const volumeServiceProvider: Provider = {
  provide: I_VOLUME_SERVICE,
  useClass: VolumeService,
};
const volumeRepositoryProvider: Provider = {
  provide: I_VOLUME_REPOSITORY,
  useClass: VolumeRepository,
};
const userVolumeServiceProvider: Provider = {
  provide: I_USER_VOLUME_SERVICE,
  useClass: UserVolumeService,
};
const userVolumeRepositoryProvider: Provider = {
  provide: I_USER_VOLUME_REPOSITORY,
  useClass: UserVolumeRepository,
};
@Module({
  imports: [
    HttpModule,
    ServiceModule,
    DatabaseModule,
    LiteraryWorkModule,
    TypeOrmModule.forFeature([Volume, LiteraryWork, UserVolume]),
  ],
  providers: [
    VolumeResolver,
    UserVolumeResolver,
    volumeServiceProvider,
    volumeRepositoryProvider,
    userVolumeServiceProvider,
    userVolumeRepositoryProvider,
  ],
  exports: [
    volumeServiceProvider,
    volumeRepositoryProvider,
    userVolumeServiceProvider,
    userVolumeRepositoryProvider,
  ],
})
export class VolumeModule {}
