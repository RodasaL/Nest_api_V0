import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ImageAiService {
  private readonly apiUrl = 'https://api.openai.com/v1/images/generations';
  private readonly apiKey = process.env.OPENAI_API_KEY; // Chave da API

  constructor(private readonly httpService: HttpService) {}

  async generateImage(prompt: string, size: string = '1024x1024', n: number = 1): Promise<string[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          { prompt, n, size },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.apiKey}`,
            },
          },
        ),
      );

      console.log(response.data); // Log the entire response
      return response.data.data.map((img) => img.url); // Retorna a URL da imagem gerada
    } catch (error) {
      console.error('Full Error Object:', error); // Log the entire error object
        console.error('Error generating image:', error.message); // Log the error message
        console.error("Error Response Data", error.response?.data); // Log the response data if available
      throw new Error('Falha ao gerar a imagem');
    }
  }
}



