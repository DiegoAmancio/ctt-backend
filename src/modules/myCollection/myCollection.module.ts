import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { MyCollectionResolver } from './infra/graphql/myCollection.resolver';
import { MyCollectionRepository } from './infra/database/myCollection.repository';
import { MyCollectionService } from './services';
import {
  I_MY_COLLECTION_SERVICE,
  I_MY_COLLECTION_REPOSITORY,
} from '@shared/utils/constants';

const MyCollectionServiceProvider: Provider = {
  provide: I_MY_COLLECTION_SERVICE,
  useClass: MyCollectionService,
};
const MyCollectionRepositoryProvider: Provider = {
  provide: I_MY_COLLECTION_REPOSITORY,
  useClass: MyCollectionRepository,
};
@Module({
  imports: [TypeOrmModule.forFeature([MyCollectionRepository])],
  providers: [
    MyCollectionResolver,
    MyCollectionServiceProvider,
    MyCollectionRepositoryProvider,
  ],
  exports: [MyCollectionServiceProvider, MyCollectionRepositoryProvider],
})
export class MyCollectionModule {}
