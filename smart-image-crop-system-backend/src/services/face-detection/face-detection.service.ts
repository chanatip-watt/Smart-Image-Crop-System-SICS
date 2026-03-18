import { Injectable, OnModuleInit } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import sharp from 'sharp';

@Injectable()
export class FaceDetectionService implements OnModuleInit {

    private model: blazeface.BlazeFaceModel;

    async onModuleInit() {
        this.model = await blazeface.load();
    }

    async detectFace(buffer: Buffer) {
        const { data, info } = await sharp(buffer)
              .removeAlpha()
              .raw()
              .toBuffer({ resolveWithObject: true });

        const tensor = tf.tensor3d(
            data,
            [info.height, info.width, info.channels]
        );


        const predictions = await this.model.estimateFaces(tensor, false);

        if (!predictions.length) {
            return null;
        }

        const face = predictions[0];

        const [x1, y1] = face.topLeft as number[];
        const [x2, y2] = face.bottomRight as number[];

        return {
            left: Math.floor(x1),
            top: Math.floor(y1),
            width: Math.floor(x2 - x1),
            height: Math.floor(y2 - y1)
        };
    }
}