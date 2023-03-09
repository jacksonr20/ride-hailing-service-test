import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CONNECTION_OPTIONS } from './config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({ ...CONNECTION_OPTIONS }),
    }),
  ],
  exports: [DatabaseModule],
})
export class DatabaseModule {}
