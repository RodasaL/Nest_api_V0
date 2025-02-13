import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; 
import { ImageAiController } from './image_ai.controller';
import { ImageAiService } from './image_ai.service';


@Module({
  imports: [HttpModule],
  controllers: [ImageAiController],
  providers: [ImageAiService]
})
export class ImageAiModule {}
