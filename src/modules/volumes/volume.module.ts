import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { VolumeResolver } from './infra/graphql/volume.resolver';
import { VolumeRepository } from './infra/database/volume.repository';
import { VolumeService } from './services';
import { I_VOLUME_SERVICE } from '@shared/utils/constants';
import { UserModule } from '@modules/user/user.module';
import { LiteraryWorkModule } from '@modules/literaryWork/literaryWork.module';

const VolumeServiceProvider: Provider = {
  provide: I_VOLUME_SERVICE,
  useClass: VolumeService,
};

@Module({
  imports: [
    UserModule,
    LiteraryWorkModule,
    TypeOrmModule.forFeature([VolumeRepository]),
  ],
  providers: [VolumeResolver, VolumeServiceProvider],
  exports: [VolumeServiceProvider],
})
export class VolumeModule {}
