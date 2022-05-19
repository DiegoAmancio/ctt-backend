import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { MyCollectionResolver } from './infra/graphql/myCollection.resolver';
import { MyCollectionRepository } from './infra/database/myCollection.repository';
import { MyCollectionService } from './services';
import { I_MY_COLLECTION_SERVICE } from '@shared/utils/constants';
import { UserModule } from '@modules/user/user.module';

const MyCollectionServiceProvider: Provider = {
  provide: I_MY_COLLECTION_SERVICE,
  useClass: MyCollectionService,
};

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([MyCollectionRepository])],
  providers: [MyCollectionResolver, MyCollectionServiceProvider],
  exports: [MyCollectionServiceProvider],
})
export class MyCollectionModule {}
