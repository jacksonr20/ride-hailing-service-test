import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { RequestController } from './request.controller';
import { RequestService } from './../services/request.service';
import { RiderService, PaymentService, TripService } from './../services';

describe('RequestController', () => {
  let controller: RequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestController],
      providers: [
        RequestService,
        {
          provide: TripService,
          useValue: () => '',
        },
        {
          provide: PaymentService,
          useValue: () => '',
        },
        {
          provide: RiderService,
          useValue: () => '',
        },
        {
          provide: DataSource,
          useValue: () => '',
        },
      ],
    }).compile();

    controller = module.get<RequestController>(RequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
