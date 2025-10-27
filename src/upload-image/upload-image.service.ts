import { Injectable, BadRequestException } from '@nestjs/common'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

@Injectable()
export class UploadImageService {
  private s3: S3Client
  private bucket = 'pkg-pms'
  private region = 'ap-southeast-1'
  constructor() {
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env
    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
      throw new Error('Missing AWS credentials in environment variables')
    }
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided')
    }

    const fileName = `${Date.now()}-${file.originalname}`
    const key = `web-pms-service/${fileName}`

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })

    await this.s3.send(command)

    const fileUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`

    return {
      message: 'File uploaded successfully',
      fileUrl,
      fileName,
      contentType: file.mimetype,
      size: file.size,
    }
  }

  async generateUploadUrl(fileName: string, contentType: string) {
    const key = `web-pms-service/${fileName}`
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    })

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 60 }) // 60 sec
    const fileUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`

    return { uploadUrl, fileUrl }
  }

  async generateViewUrl(fileName: string) {
    const key = `web-pms-service/${fileName}`
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    })
    const viewUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 }) // 1 hour
    return { viewUrl }
  }
}
