import { Module } from '@nestjs/common';

// App Modules
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { HealthModule } from './health';

@Module({
  imports: [ConfigModule, DatabaseModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
