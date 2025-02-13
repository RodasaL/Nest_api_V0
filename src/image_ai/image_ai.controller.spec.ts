import { Test, TestingModule } from '@nestjs/testing';
import { ImageAiController } from './image_ai.controller';

describe('ImageAiController', () => {
  let controller: ImageAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageAiController],
    }).compile();

    controller = module.get<ImageAiController>(ImageAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
