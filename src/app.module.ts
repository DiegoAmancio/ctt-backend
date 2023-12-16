import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { nestJsConfig } from './config/ormconfig';
import { InternationalizationModule } from '@modules/internationalization/internationalization.module';
import { LiteraryWorkModule } from '@modules/literaryWork/literaryWork.module';
import { VolumeModule } from '@modules/volumes/volume.module';
import { ControllerModule } from '@infrastructure/controller/controller.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { ServiceModule } from '@service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(nestJsConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    InternationalizationModule,
    LiteraryWorkModule,
    VolumeModule,
    ControllerModule,
    ServiceModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
