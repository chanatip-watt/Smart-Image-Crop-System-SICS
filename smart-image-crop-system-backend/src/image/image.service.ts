import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CropService } from 'src/services/crop/crop.service';
import { FaceDetectionService } from 'src/services/face-detection/face-detection.service';
import { PersonDetectionService } from 'src/services/person-detection/person-detection.service';
import sharp from 'sharp';

@Injectable()
export class ImageService {

  constructor(
    private readonly faceDetectionService: FaceDetectionService,
    private readonly personDetectionService: PersonDetectionService,
    private readonly cropService: CropService
  ) {}

  async processImage(file: Express.Multer.File, type: string) {
    if (!file) {
      throw new BadRequestException('ไม่มีการอัพโหลดไฟล์');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('ไม่ใช่รูปภาพ');
    }

    const detectors = {
      face: this.faceDetectionService.detectFace.bind(this.faceDetectionService),
      person: this.personDetectionService.detectPerson.bind(this.personDetectionService),
    };

    const detect = detectors[type];

    if (!detect) {
      throw new BadRequestException('ประเภทการตรวจจับไม่ถูกต้อง');
    }

    const box = await detect(file.buffer);

    if (!box) {
      throw new NotFoundException(`ไม่พบเป้าหมาย ${type} ในภาพ`);
    }

    const { left, top, width, height } = box;

    if (
      left < 0 ||
      top < 0 ||
      width <= 0 ||
      height <= 0
    ) {
      throw new BadRequestException('พิกัดไม่ถูกต้อง');
    }

    const metadata = await sharp(file.buffer).metadata();
    const imageWidth = metadata.width;
    const imageHeight = metadata.height;

    if (!imageWidth || !imageHeight) {
      throw new BadRequestException('ไม่สามารถอ่านขนาดภาพได้');
    }

    if (
      left + width > imageWidth ||
      top + height > imageHeight
    ) {
      throw new BadRequestException('พิกัดเกินขนาดของภาพ (Out of bounds)');
    }

    const cropped = await this.cropService.cropImage(file.buffer, box);

    return cropped;
  }
}