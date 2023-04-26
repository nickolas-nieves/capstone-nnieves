import { Test, TestingModule } from '@nestjs/testing';
import { ScooterService } from './scooter.service';

describe('ScooterService', () => {
  let service: ScooterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScooterService],
    }).compile();

    service = module.get<ScooterService>(ScooterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
