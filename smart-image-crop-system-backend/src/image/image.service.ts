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

  async processImage(file: Express.Multer.File, type: 'face' | 'person') {
    if (!file) {
      throw new BadRequestException('ไม่มีการอัพโหลดไฟล์');
    } else

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

    let { left, top, width, height } = box;

    const metadata = await sharp(file.buffer).metadata();
    const imageWidth = metadata.width;
    const imageHeight = metadata.height;

    if (!imageWidth || !imageHeight) {
      throw new BadRequestException('ไม่สามารถอ่านขนาดภาพได้');
    }

    left = Math.max(0, Math.min(left, imageWidth - 1));
    top = Math.max(0, Math.min(top, imageHeight - 1));
    width = Math.max(0, Math.min(width, imageWidth - left));
    height = Math.max(0, Math.min(height, imageHeight - top));

    if (width <= 0 || height <= 0) {
      throw new BadRequestException('พิกัดไม่ถูกต้องหลัง clamp');
    }

    const cropped = await this.cropService.cropImage(file.buffer, { left, top, width, height });

    return cropped;
  }
}