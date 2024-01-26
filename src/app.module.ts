import { nestJsConfig } from '@config/ormconfig';
import { ControllerModule } from '@infrastructure/controller/controller.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from '@service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(nestJsConfig),
    ControllerModule,
    ServiceModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
