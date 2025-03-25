import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { res } from '../common/response.helper';
import { AttachmentsService } from './attachments.service';
import { multerOptionsAws } from './utils/multerOptionsAws';
import { multerOptionsLocal } from './utils/multerOptionsLocal';

@Controller('attachments')
export class AttachmentsController {
  constructor(
    private readonly attachmentsService: AttachmentsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /*
   * upload an image to S3 & return the rl
   * */
  // @Post('upload-image')
  // @UseInterceptors(FileInterceptor('file',
  //   process.env.NODE_ENV === 'development'
  //     ? multerOptionsLocal
  //     : multerOptionsAws))
  // async uploadImage(@UploadedFile(
  // ) file, @Body('name') name: string) {
  //   //for dev, upload the images on local file system
  //   if (process.env.NODE_ENV === 'development') {//TODO get env from config service
  //     return res.success({ url:  `${process.env.APP_URL}/uploads/${file.filename}`, name }, 'Success');
  //     //dont need to put `public` in the url
  //   } else {
  //     const uploaded: any = await this.attachmentsService.upload(file);
  //     if (uploaded) {
  //       return res.success({ url: uploaded?.Location, name }, 'Success');
  //     } else {
  //       return res.error('Failed to upload image');
  //     }
  //   }
  // }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file',
    process.env.NODE_ENV === 'development'
      ? multerOptionsLocal
      : {}))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (process.env.NODE_ENV === 'development') {//TODO get env from config service
      return res.success({ url:  `${process.env.APP_URL}/uploads/${file.filename}`, name: '' }, 'Success');
      //dont need to put `public` in the url
    } else {
      const response = await this.cloudinaryService.uploadFile(file);
      return res.success({ url: response.url, name: '' }, 'Success');
    }

  }

  @Post('delete')
  deleteImage(@Body('url') url: string) {
    const response = this.cloudinaryService.deleteFile(url);
    return res.success(response, 'Success');
  }

  //
  //   {
  //     "asset_id": "45f54dc33b84a492cea930bef4d6b5c2",
  //     "public_id": "b2jmdhm0760iori0zbrd",
  //     "version": 1708254069,
  //     "version_id": "a880eef15a1551dc63bee9209e006d7c",
  //     "signature": "7679901288098b3aaf4ec8d166a0c5f92b2b9272",
  //     "width": 960,
  //     "height": 538,
  //     "format": "jpg",
  //     "resource_type": "image",
  //     "created_at": "2024-02-18T11:01:09Z",
  //     "tags": [],
  //     "bytes": 82855,
  //     "type": "upload",
  //     "etag": "8de905aacdb38f45f57a3f7aac83faa1",
  //     "placeholder": false,
  //     "url": "http://res.cloudinary.com/ddlizwml0/image/upload/v1708254069/b2jmdhm0760iori0zbrd.jpg",
  //     "secure_url": "https://res.cloudinary.com/ddlizwml0/image/upload/v1708254069/b2jmdhm0760iori0zbrd.jpg",
  //     "folder": "",
  //     "original_filename": "file",
  //     "api_key": "122683521989839"
  // }
}
