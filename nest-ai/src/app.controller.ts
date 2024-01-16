import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

interface DataType {
  role: string;
  content: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // gpt 채팅
  @Get('text')
  async getGenerateAnswer(@Query('data') data: string): Promise<DataType> {
    const nullData: DataType = {
      role: 'assistant',
      content: '오류가 발생했습니다.',
    };
    try {
      const answer = await this.appService.getGenerateAnswer(data);
      return answer;
    } catch (e) {
      return nullData;
    }
  }

  // -------------------------이미지-------------------------
  @Get('image')
  async getImage(@Query('data') data: string): Promise<string> {
    try {
      const answer = await this.appService.getImage(data);
      return answer;
    } catch (e) {
      console.log('에러:', e);
      return `이미지를 가져오는 중 오류`;
    }
  }

  // 이미지 편집
  @Get('edit')
  async getEditImage(@Query('data') data: string): Promise<string> {
    try {
      const answer = await this.appService.getEditImage(data);
      return answer;
    } catch (e) {
      console.log('에러:', e);
      return '이미지를 가져오는 중 에러';
    }
  }

  // 이미지 변형
  @Get('variation')
  async getVariationImagep(): Promise<string> {
    try {
      const answer = await this.appService.getVariationImage();
      return answer;
    } catch (e) {
      console.log('에러:', e);
      return '이미지 변형 중 오류';
    }
  }

  // 번역
  @Get('translation')
  async getEng(@Query('data') data: string): Promise<string> {
    try {
      const answer = await this.appService.getEng(data);
      return answer;
    } catch (e) {
      return '한글 번역 중 오류';
    }
  }
}
