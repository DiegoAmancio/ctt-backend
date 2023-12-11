import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './repository';
import { providersAndExports } from './repository/providersAndExports';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  providers: providersAndExports,
  exports: providersAndExports,
})
export class DatabaseModule {}
