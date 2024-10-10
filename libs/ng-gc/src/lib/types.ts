export type NGGCSentiment = {
  sentiment: string;
  intensity: number;
  emoji: string;
  category: 'positive' | 'negative';
  reason: string;
  message: string;
  suggested_action: 'allow' | 'block';
};

export type NgGCAiModel = 'gemini-1.5-pro' | 'gemini-1.5-flash';

export type NGGCSupportedModel = {
  title: string;
  name: NgGCAiModel;
};
export type NgGCConfig = {
  apiKey: string;
  model: NgGCAiModel;
  debug?: boolean;
};
