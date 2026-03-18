import { Injectable, OnModuleInit } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import sharp from 'sharp';

@Injectable()
export class PersonDetectionService implements OnModuleInit {

  private model: cocoSsd.ObjectDetection;

  async onModuleInit() {
    this.model = await cocoSsd.load();
  }

  async detectPerson(buffer: Buffer) {

    const { data, info } = await sharp(buffer)
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const tensor = tf.tensor3d(
      data,
      [info.height, info.width, info.channels]
    );

    const predictions = await this.model.detect(tensor);

    const person = predictions.find(p => p.class === 'person');

    if (!person) {
      return null;
    }

    const [x, y, width, height] = person.bbox;

    return {
      left: Math.floor(x),
      top: Math.floor(y),
      width: Math.floor(width),
      height: Math.floor(height)
    };
  }
}