import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { NGGC_API_CONFIG, NgGCSupportedModels } from '@codewithahsan/ng-gc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
      provide: NGGC_API_CONFIG,
      useFactory: () => {
        if (!process.env.NG_GC_GEMINI_API_KEY) {
          const apiKey = prompt(
            "There's no API key in the environment. Please enter your Gemini API Key for the demo. And don't worry, we don't store it anywhere, and the code is public on GitHub :)"
          );
          return {
            model: NgGCSupportedModels[1].name,
            apiKey,
          };
        }
        return {
          model: NgGCSupportedModels[1].name,
          apiKey: process.env.NG_GC_GEMINI_API_KEY,
        };
      },
    },
  ],
};
