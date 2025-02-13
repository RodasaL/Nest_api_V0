import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as vision from '@google-cloud/vision';
//import * as dotenv from 'dotenv';

//dotenv.config();

@Injectable()
export class ImageAiService {
  private client: vision.ImageAnnotatorClient;
  private readonly apiUrl = 'https://vision.googleapis.com/v1/images:annotate';
  

  constructor(private readonly httpService: HttpService) {
    this.client = new vision.ImageAnnotatorClient({
        keyFilename : process.env.GOOGLE_JSON_KEY,
    });
    
  }
  
  async analyzeImage(base64Image: string) {
    const imageBuffer = Buffer.from(base64Image, 'base64'); // Converter base64 para Buffer

    try {
      const [result] = await this.client.annotateImage({
        image: { content: imageBuffer.toString('base64') },
        features: [
          { type: 'LABEL_DETECTION' },
          { type: 'LOGO_DETECTION' },
          { type: 'TEXT_DETECTION' },
          { type: 'SAFE_SEARCH_DETECTION' },
        ],
      });

      return {
        labels: result.labelAnnotations || [],
        logos: result.logoAnnotations || [],
        text: result.textAnnotations?.map((t) => t.description).join(' ') || '',
        safeSearch: result.safeSearchAnnotation || {},
      };
    } catch (error) {
      throw new Error(`Erro ao analisar imagem: ${error.message}`);
    }
  }
}
