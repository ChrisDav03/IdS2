import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 } from 'uuid';
import Boom from '@hapi/boom';
import { MINIO_ACCESS_KEY, MINIO_HOST, MINIO_SECRET_KEY } from '../commons/env.mjs';
import { BUCKET_NAME } from '../commons/constans.mjs';

class MinioService {
  conn = null;

  constructor() {
    if (!this.conn) {
      this.conn = new S3Client({
        region: 'us-esat-1',
        credentials: {
          accessKeyId: MINIO_ACCESS_KEY,
          secretAccessKey: MINIO_SECRET_KEY,
        },
        endpoint: MINIO_HOST,
        forcePathStyle: true,
      });
    }
  }

  async saveImage(image) {
    try {
      if (!image) {
        throw Boom.badRequest('Imagen requerida');
      }
      if (!image.originalname) {
        throw Boom.badRequest('Image originalname es requerido');
      }
      if (!image.buffer) {
        throw Boom.badRequest('Image buffer es requerido');
      }

      const { originalname, buffer } = image;

      const originalnameParts = originalname.split('.');

      if (originalnameParts.length !== 2) {
        throw Boom.badRequest('Image invalid name');
      }

      const extension = originalnameParts[1];

      const fileName = `${v4()}.${extension}`;

      await this.conn.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: buffer,
      }));

      return fileName;
    } catch (error) {
      throw Boom.isBoom(error) ? error : Boom.internal('Error saving image', error);
    }
  }
}

export default MinioService;
