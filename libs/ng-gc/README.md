# ng-gc

Angular Components for Gemini

## Installation

```shell
npm install @codewithahsan/ng-gc @google/generative-ai
```

## How to use

### Sentiment Analysis Component
```ts
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { NGGC_API_CONFIG, NgGCConfig, NgGCSupportedModels } from '@codewithahsan/ng-gc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
      provide: NGGC_API_CONFIG,
      useValue: {
        model: 'gemini-1.5-flash',
        apiKey: 'YOUR_GEMINI_API_KEY',
        debug: true // (optional): enables console log of gemini response
      } as NgGCConfig,
    },
  ],
};

```

```ts
// app.component.ts
import {
  GeminiService,
  NgGCSupportedModels,
  SentimentAnalyzerComponent,
} from '@codewithahsan/ng-gc';

@Component({
  standalone: true,
  imports: [RouterModule, SentimentAnalyzerComponent, ReactiveFormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
}) 
export class AppComponent {

}
```

```html
<!-- app.component.html -->

<ng-gc-sentiment-analyzer
  [config]="sentimentConfig()"
  [text]="inputTextValDebounced()" />
```

## Running unit tests

Run `nx test ng-gc` to execute the unit tests.
