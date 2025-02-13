
import { Controller, Get, Query,Post,Body } from '@nestjs/common';
import { ImageAiService } from './image_ai.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Image_generator')
@Controller('image-ai')
export class ImageAiController {
  constructor(private readonly imageService: ImageAiService) {}

 
  @Post('generate')
  async generateImage(@Body() body: { prompt: string }) {
    const { prompt } = body;
    const imageUrls = await this.imageService.generateImage(prompt);
    return { imageUrls };
  }
}
