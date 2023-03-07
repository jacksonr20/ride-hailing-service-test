import { Module } from '@nestjs/common';

import { RiderModule } from './riders';

@Module({
  imports: [RiderModule],
})
export class ApiModule {}
