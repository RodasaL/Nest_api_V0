import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ImageAiModule } from './image_ai/image_ai.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UsersModule, ImageAiModule,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
