import {
  Component,
  effect,
  HostBinding,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';
import { NGGCSentimentAnalaysisConfig, NGGCSentiment } from '../../types';

@Component({
  selector: 'ng-gc-sentiment-analyzer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sentiment-analyzer.component.html',
  styleUrl: './sentiment-analyzer.component.css',
})
export class SentimentAnalyzerComponent {
  geminiService = inject(GeminiService);
  text = input.required<string>();
  config = input<NGGCSentimentAnalaysisConfig | null>(null);
  sentiment = signal<NGGCSentiment | null>(null);
  loading = signal(false);
  error = signal<Error | null>(null);
  @HostBinding('attr.data-sentiment')
  get sentimentAttr() {
    if (this.loading()) {
      return 'loading';
    }
    return this.sentiment()?.category || null;
  }
  constructor() {
    effect(
      () => {
        const textVal = this.text().trim();
        if (!textVal) {
          this.loading.set(false);
          this.sentiment.set(null);
          return;
        }
        this.loading.set(true);
        this.geminiService
          .analyze(this.text(), this.config())
          .then((result) => {
            if (this.geminiService.geminiApiConfig.debug) {
              console.log(result);
            }
            this.sentiment.set(result);
            this.error.set(null);
          })
          .catch((err) => {
            console.error(err);
            this.error.set(err);
            this.sentiment.set(null);
          })
          .finally(() => {
            this.loading.set(false);
          });
      },
      {
        allowSignalWrites: true,
      }
    );
  }
}
