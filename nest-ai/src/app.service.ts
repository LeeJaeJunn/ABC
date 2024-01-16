import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

interface DataType {
  role: string;
  content: string;
}

@Injectable()
export class AppService {
  private openai: OpenAI;
  // private openai;

  constructor() {
    const apiKey = Your_api_Key;
    this.openai = new OpenAI({ apiKey: apiKey } as any);
  }
  // constructor() {
  //   const apiKey = process.env.OPENAI_API_KEY;
  //   this.openai = new OpenAI({ apiKey } as any);
  // }

  getHello(): string {
    return 'Nest-AI';
  }

  // AI 채팅 (내가 원하는 이미지의 텍스트 형식을 추천 ) 작업중
  async getGenerateAnswer(data: string): Promise<DataType> {
    const nullData: DataType = {
      role: 'assistant',
      content: '답을 찾을 수 없습니다.',
    };
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-1106-preview',
        messages: JSON.parse(data),
      });

      return response.choices[0]?.message || nullData;
    } catch (e) {
      console.log('Api 호출 중 에러', e);
    }
  }

  // -------------------------이미지-------------------------

  // 이미지 생성
  async getImage(data: string): Promise<string> {
    try {
      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: data,
        size: '1024x1024',
        quality: 'standard',
        n: 1,
      });
      return response.data[0]?.url || '답을 찾을 수 없습니다';
    } catch (e) {
      console.log('Api 호출 중 에러', e);
    }
  }

  // 내가 올린 이미지 편집.(원하는대로) 작업중
  async getEditImage(data: string): Promise<string> {
    const filePath = path.resolve(
      __dirname,
      '/Users/leejjun/projects/my-ai-service/nest-ai/src/picture/ai-cat.jpg',
    );

    try {
      const response = await this.openai.images.edit({
        model: 'dall-e-2',
        image: fs.createReadStream(filePath),
        prompt: data,
        n: 1,
        size: '1024x1024',
      });
      return response.data[0].url;
    } catch (e) {
      console.log('Api 호출 중 에러', e);
    }
  }

  // 내가 올린 이미지 변형.(원하는대로X) 작업중
  async getVariationImage(): Promise<string> {
    const filePath = path.resolve(
      __dirname,
      '/Users/leejjun/projects/my-ai-service/nest-ai/src/picture/ai-cat.png',
    );
    try {
      const response = await this.openai.images.createVariation({
        // model: 'dall-e-2',
        image: fs.createReadStream(filePath),
        size: '1024x1024',
        n: 1,
      });
      return response.data[0].url || '답을 찾을 수 없습니다';
    } catch (e) {
      console.log('Api 호출 중 에러', e);
    }
  }

  // 한글 => 영어 번역
  async getEng(data: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: '넌 한국어를 받아서 영어로 번역해주는 assistant야.',
          },
          {
            role: 'user',
            content: '"귀여운 토끼를 그려줘" 를 번역해줘',
          },
          {
            role: 'system',
            content: 'Draw a cute bunny',
          },
          {
            role: 'user',
            content: `"${data}" 를 번역해줘`,
          },
        ],
      });
      return response.choices[0]?.message.content || '번역에 실패했습니다.';
    } catch (e) {
      console.log('영어 번역 중 오류', e);
    }
  }
}
