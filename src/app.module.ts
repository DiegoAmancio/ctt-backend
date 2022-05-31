import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import ormconfig = require('./config/ormconfig'); //path mapping doesn't work here
import { AuthorModule } from '@modules/author/author.module';
import { MyCollectionModule } from '@modules/myCollection/myCollection.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig[0]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    AuthModule,
    AuthorModule,
    MyCollectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
