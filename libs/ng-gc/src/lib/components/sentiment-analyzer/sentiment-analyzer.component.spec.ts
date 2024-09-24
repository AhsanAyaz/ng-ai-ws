import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SentimentAnalyzerComponent } from './sentiment-analyzer.component';

describe('SentimentAnalyzerComponent', () => {
  let component: SentimentAnalyzerComponent;
  let fixture: ComponentFixture<SentimentAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentimentAnalyzerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SentimentAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
