import { Test, TestingModule } from '@nestjs/testing';
import { FaceDetectionService } from './face-detection.service';

describe('FaceDetectionService', () => {
  let service: FaceDetectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaceDetectionService],
    }).compile();

    service = module.get<FaceDetectionService>(FaceDetectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
