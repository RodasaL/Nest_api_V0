import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS
  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Nest_Api_V0')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addTag('Manipulacao do Array')
    .addTag('Image_generator')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
