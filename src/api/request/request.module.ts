import { Module } from '@nestjs/common';

import { RequestController } from './controllers';

@Module({
  controllers: [RequestController],
})
export class RequestModule {}
