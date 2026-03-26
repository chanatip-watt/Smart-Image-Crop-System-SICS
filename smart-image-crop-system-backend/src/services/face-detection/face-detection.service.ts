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
        let tensor: tf.Tensor3D | null = null;

        try {

            const { data, info } = await sharp(buffer)
                .removeAlpha()
                .raw()
                .toBuffer({ resolveWithObject: true });

            if (!info.width || !info.height || info.channels !== 3) {
                throw new Error('Invalid image format');
            }

            tensor = tf.tensor3d(
                new Uint8Array(data),
                [info.height, info.width, info.channels]
            );

            if (!this.model) {
                throw new Error('Model not loaded');
            }

            const predictions = await this.model.estimateFaces(tensor, false);

            if (!predictions || predictions.length === 0) {
                return null;
            }

            const face = predictions.reduce((prev, current) => {
                const prevArea =
                    (prev.bottomRight[0] - prev.topLeft[0]) *
                    (prev.bottomRight[1] - prev.topLeft[1]);

                const currArea =
                    (current.bottomRight[0] - current.topLeft[0]) *
                    (current.bottomRight[1] - current.topLeft[1]);

                return currArea > prevArea ? current : prev;
            });

            const [x1, y1] = face.topLeft as number[];
            const [x2, y2] = face.bottomRight as number[];

            const left = Math.max(0, Math.floor(x1));
            const top = Math.max(0, Math.floor(y1));
            const width = Math.max(0, Math.floor(x2 - x1));
            const height = Math.max(0, Math.floor(y2 - y1));

            return {
                left,
                top,
                width,
                height
            };

        } catch (error) {
            console.error('detectFace error:', error);
            return null;
        } finally {
            if (tensor) {
                tensor.dispose();
            }
        }
    }
}