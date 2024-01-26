import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './repository';
import { providersAndExports } from './repository/providersAndExports';
import { InternationalizationRepository } from './repository/internationalization';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorRepository]),
    TypeOrmModule.forFeature([InternationalizationRepository]),
  ],
  providers: providersAndExports,
  exports: providersAndExports,
})
export class DatabaseModule {}
