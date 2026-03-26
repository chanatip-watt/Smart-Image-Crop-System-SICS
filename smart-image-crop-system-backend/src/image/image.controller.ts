import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Body,
  Res,
  HttpCode
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {

  constructor(private readonly imageService: ImageService) {}

  @Post('process-image')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: 'face' | 'person',
    @Res() res: Response
  ) {

    const result = await this.imageService.processImage(file, type);

    res.set({
      'Content-Type': 'image/jpeg'
    });

    res.send(result);
  }
}