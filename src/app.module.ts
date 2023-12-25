import { nestJsConfig } from '@config/ormconfig';
import { ControllerModule } from '@infrastructure/controller/controller.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { VolumeModule } from '@modules/volumes/volume.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from '@service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(nestJsConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    VolumeModule,
    ControllerModule,
    ServiceModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
