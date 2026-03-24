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
      let tensor: tf.Tensor3D | null = null;

      try {
          const { data, info } = await sharp(buffer)
              .resize(512, 512, { fit: 'inside' })
              .removeAlpha() 
              .raw()
              .toBuffer({ resolveWithObject: true });


          if (!info.width || !info.height || info.channels !== 3) {
              throw new Error('Invalid image format');
          }

      
          tensor = tf.tensor3d(new Uint8Array(data), [info.height, info.width, info.channels]);


          if (!this.model) {
              throw new Error('Model not loaded');
          }

          const predictions = await this.model.detect(tensor);

          if (!predictions || predictions.length === 0) {
              return null;
          }

          const person = predictions
              .filter(p => p.class === 'person')
              .sort((a, b) => (b.bbox[2] * b.bbox[3]) - (a.bbox[2] * a.bbox[3]))[0];

          if (!person) return null;

          const [x, y, width, height] = person.bbox;


          return {
              left: Math.max(0, Math.floor(x)),
              top: Math.max(0, Math.floor(y)),
              width: Math.max(0, Math.floor(width)),
              height: Math.max(0, Math.floor(height))
          };

      } catch (error) {
          console.error('detectPerson error:', error);
          return null;
      } finally {
          if (tensor) tensor.dispose();
      }
  }
}