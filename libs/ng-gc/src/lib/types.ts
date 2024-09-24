export type NGGCSentimentResponse = {
  sentiment: string;
  rating: number;
  emoji: string;
  category: 'positive' | 'negative';
};

export type NGGCSentimentAnalaysisConfig = {
  model?: string;
};

type AiModel = 'gemini-1.5-pro' | 'gemini-1.5-flash';

export type NGGCSupportedModel = {
  title: string;
  name: AiModel;
};
export type NgGCConfig = {
  apiKey: string;
  model: AiModel;
};
