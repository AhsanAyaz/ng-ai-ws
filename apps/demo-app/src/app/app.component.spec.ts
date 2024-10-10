import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { GeminiService } from '@codewithahsan/ng-gc';
import { provideToastr } from 'ngx-toastr';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NxWelcomeComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: GeminiService,
          useClass: class GeminiServiceMock {
            geminiApiConfig = {
              model: '',
              apiKey: '',
            };
          },
        },
        provideToastr(),
      ],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header nav')?.textContent).toContain(
      'Sentiment Analyzer with Google Gemini & Angular'
    );
  });
});
