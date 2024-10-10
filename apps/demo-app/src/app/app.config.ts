import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { NGGC_API_CONFIG, NgGCSupportedModels } from '@codewithahsan/ng-gc';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
      provide: NGGC_API_CONFIG,
      useValue: {
        model: NgGCSupportedModels[1].name,
        apiKey: process.env.NG_GC_GEMINI_API_KEY,
      },
    },
    provideToastr(),
    provideAnimations(),
  ],
};
