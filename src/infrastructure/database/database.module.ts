import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthorRepository,
  LiteraryWorkRepository,
  UserRepository,
  VolumeRepository,
} from './repository';
import { providersAndExports } from './repository/providersAndExports';
import { InternationalizationRepository } from './repository/internationalization';
import { UserVolumeRepository } from './repository/userVolume';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([LiteraryWorkRepository]),
    TypeOrmModule.forFeature([VolumeRepository]),
    TypeOrmModule.forFeature([UserVolumeRepository]),
    TypeOrmModule.forFeature([InternationalizationRepository]),
  ],
  providers: providersAndExports,
  exports: providersAndExports,
})
export class DatabaseModule {}
