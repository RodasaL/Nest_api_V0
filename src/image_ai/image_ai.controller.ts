
import { Controller, Get, Query,Post,Body } from '@nestjs/common';
import { ImageAiService } from './image_ai.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Image_generator')
@Controller('image-ai')
export class ImageAiController {
  constructor(private readonly imageService: ImageAiService) {}

 
  @Post('analyze')
  async analyzeimage(@Body('image') base64Image: string) {
    if (!base64Image) {
      return { error: 'Image is required in base64 format' };
    }
    return await this.imageService.analyzeImage(base64Image);
  }
}
