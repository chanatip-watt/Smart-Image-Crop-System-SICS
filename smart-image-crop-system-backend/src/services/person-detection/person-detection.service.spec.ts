import { Test, TestingModule } from '@nestjs/testing';
import { PersonDetectionService } from './person-detection.service';

describe('PersonDetectionService', () => {
  let service: PersonDetectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonDetectionService],
    }).compile();

    service = module.get<PersonDetectionService>(PersonDetectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
