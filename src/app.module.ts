import { Module } from '@nestjs/common';

// App Modules
import { ApiModule } from './api';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { HealthModule } from './health';

@Module({
  imports: [ConfigModule, DatabaseModule, HealthModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
