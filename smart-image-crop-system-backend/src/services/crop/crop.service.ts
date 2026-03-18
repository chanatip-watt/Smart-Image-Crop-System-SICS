import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class CropService {

  async cropImage(
    buffer: Buffer,
    box: {
      left: number;
      top: number;
      width: number;
      height: number;
    }
  ) {

    const cropped = await sharp(buffer)
      .extract({
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height
      })
      .jpeg()
      .toBuffer();

    return cropped;
  }

}