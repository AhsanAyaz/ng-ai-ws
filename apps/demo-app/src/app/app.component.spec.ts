import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { GeminiService, NGGC_API_CONFIG } from '@codewithahsan/ng-gc';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NxWelcomeComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: GeminiService,
          useClass: class GeminiServiceMock {},
        },
        {
          provide: NGGC_API_CONFIG,
          useValue: {
            model: '',
            apiKey: '',
          },
        },
      ],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header nav')?.textContent).toContain(
      'Angular Gemini Demo App'
    );
  });
});
