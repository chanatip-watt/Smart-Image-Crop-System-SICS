import { Module } from '@nestjs/common';
import { FaceDetectionService } from './face-detection/face-detection.service';
import { PersonDetectionService } from './person-detection/person-detection.service';
import { CropService } from './crop/crop.service';


@Module({
  providers: [
    FaceDetectionService,
    PersonDetectionService,
    CropService
  ],
  exports: [
    FaceDetectionService,
    PersonDetectionService,
    CropService
  ]
})
export class ServicesModule {}