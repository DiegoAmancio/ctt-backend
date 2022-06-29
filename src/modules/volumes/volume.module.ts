import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { VolumeResolver } from './infra/graphql/volume.resolver';
import { VolumeRepository } from './infra/database/volume.repository';
import { UserVolumeService, VolumeService } from './services';
import {
  I_VOLUME_SERVICE,
  I_VOLUME_REPOSITORY,
  I_USER_VOLUME_REPOSITORY,
  I_USER_VOLUME_SERVICE,
} from '@shared/utils/constants';
import { UserModule } from '@modules/user/user.module';
import { LiteraryWorkModule } from '@modules/literaryWork/literaryWork.module';
import { LiteraryWork } from '@modules/literaryWork/infra/database';
import { MyCollectionModule } from '@modules/myCollection/myCollection.module';
import { UserVolume, UserVolumeRepository } from './infra/database';
import { UserVolumeResolver } from './infra/graphql/userVolume.resolver';

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
    UserModule,
    LiteraryWorkModule,
    MyCollectionModule,
    TypeOrmModule.forFeature([
      VolumeRepository,
      UserVolumeRepository,
      LiteraryWork,
      UserVolume,
    ]),
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
