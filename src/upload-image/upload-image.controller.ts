import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { UploadImageService } from './upload-image.service';

@ApiTags('S3 Upload')
@Controller('s3')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload file to S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File uploaded successfully',
    schema: {
      example: {
        message: 'File uploaded successfully',
        fileUrl:
          'https://pkg-pms.s3.ap-southeast-1.amazonaws.com/web-pms-service/1729612345678-image.jpg',
        fileName: '1729612345678-image.jpg',
        contentType: 'image/jpeg',
        size: 123456,
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadImageService.uploadFile(file);
  }

  @Get('presigned-url')
  @ApiOperation({ summary: 'Get presigned URL for direct upload to S3' })
  @ApiQuery({
    name: 'fileName',
    required: true,
    description: 'Name of the file to upload',
    example: 'my-image.jpg',
  })
  @ApiQuery({
    name: 'contentType',
    required: true,
    description: 'MIME type of the file',
    example: 'image/jpeg',
  })
  @ApiResponse({
    status: 200,
    description: 'Presigned URL generated successfully',
    schema: {
      example: {
        uploadUrl:
          'https://pkg-pms.s3.ap-southeast-1.amazonaws.com/web-pms-service/my-image.jpg?X-Amz-Algorithm=...',
        fileUrl:
          'https://pkg-pms.s3.ap-southeast-1.amazonaws.com/web-pms-service/my-image.jpg',
      },
    },
  })
  async getPresignedUrl(
    @Query('fileName') fileName: string,
    @Query('contentType') contentType: string,
  ) {
    return this.uploadImageService.generateUploadUrl(fileName, contentType);
  }

  @Get('view-url')
  @ApiOperation({ summary: 'Get presigned URL to view/download file from S3' })
  @ApiQuery({
    name: 'fileName',
    required: true,
    description: 'Name of the file to view',
    example: 'my-image.jpg',
  })
  @ApiResponse({
    status: 200,
    description: 'View URL generated successfully',
    schema: {
      example: {
        viewUrl:
          'https://pkg-pms.s3.ap-southeast-1.amazonaws.com/web-pms-service/my-image.jpg?X-Amz-Algorithm=...',
      },
    },
  })
  async getViewUrl(@Query('fileName') fileName: string) {
    return this.uploadImageService.generateViewUrl(fileName);
  }
}