import { TestBed } from '@angular/core/testing';

import { GeminiService } from './gemini.service';
import { NGGC_API_CONFIG } from '../tokens/gemini-api-config';
import { NgGCSupportedModels } from '../constants/ai-models';

describe('GeminiService', () => {
  let service: GeminiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NGGC_API_CONFIG,
          useValue: {
            apiKey: 'testAPIKey',
            model: NgGCSupportedModels[1].name,
          },
        },
      ],
    });
    service = TestBed.inject(GeminiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
