import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { VolumeResolver } from './infra/graphql/volume.resolver';
import { VolumeRepository } from './infra/database/volume.repository';
import { VolumeService } from './services';
import { I_VOLUME_SERVICE, I_VOLUME_REPOSITORY } from '@shared/utils/constants';
import { UserModule } from '@modules/user/user.module';
import { LiteraryWorkModule } from '@modules/literaryWork/literaryWork.module';
import { LiteraryWork } from '@modules/literaryWork/infra/database';

const volumeServiceProvider: Provider = {
  provide: I_VOLUME_SERVICE,
  useClass: VolumeService,
};
const volumeRepositoryProvider: Provider = {
  provide: I_VOLUME_REPOSITORY,
  useClass: VolumeRepository,
};
@Module({
  imports: [
    UserModule,
    LiteraryWorkModule,
    TypeOrmModule.forFeature([VolumeRepository, LiteraryWork]),
  ],
  providers: [VolumeResolver, volumeServiceProvider, volumeRepositoryProvider],
  exports: [volumeServiceProvider, volumeRepositoryProvider],
})
export class VolumeModule {}
