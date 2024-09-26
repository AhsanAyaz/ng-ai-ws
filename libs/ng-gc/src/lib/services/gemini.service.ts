import { inject, Injectable } from '@angular/core';
import { NGGC_API_CONFIG } from '../tokens/gemini-api-config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NGGCSentimentAnalaysisConfig, NGGCSentiment } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  geminiApiConfig = inject(NGGC_API_CONFIG);
  genAI!: GoogleGenerativeAI;
  checkConfig() {
    if (this.genAI) {
      return;
    }
    if (!this.geminiApiConfig.apiKey) {
      throw new Error('Gemini Api Key not provided');
    }
    if (!this.geminiApiConfig.model) {
      throw new Error('Gemini model not provided');
    }
    this.genAI = new GoogleGenerativeAI(this.geminiApiConfig.apiKey);
  }

  async analyze(text: string, config: NGGCSentimentAnalaysisConfig | null) {
    this.checkConfig();
    const model = this.genAI.getGenerativeModel({
      model: config?.model || this.geminiApiConfig.model,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });
    const prompt = `
      You are an expert sentiment analyst and I want you to analyze the sentiment of the text
      I will provide to you. With a rating from 0 = 10 in terms of intensity of the sentiment.
      Give an emoji for the particular rating.

      The sentiments can be positive, happy, appreciative, etc. Or negative, toxic, vulgar etc.
      The response should be a stringified JSON in the following format:
      {
        "sentiment": 'positive' | 'happy' | 'toxic' etc,
        "rating": number,
        "emoji": string,
        "category": "positive" | "negative"
      }

      This is the text:
      ${text}
    `;
    const result = await model.generateContent([prompt]);
    return JSON.parse(result.response.text()) as NGGCSentiment;
  }
}
