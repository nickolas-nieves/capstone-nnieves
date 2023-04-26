import { Test, TestingModule } from '@nestjs/testing';
import { ScooterController } from './scooter.controller';
import { ScooterService } from './scooter.service';

describe('ScooterController', () => {
  let controller: ScooterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScooterController],
      providers: [ScooterService],
    }).compile();

    controller = module.get<ScooterController>(ScooterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
