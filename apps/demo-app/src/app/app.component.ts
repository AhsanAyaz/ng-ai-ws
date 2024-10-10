import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  GeminiService,
  NGGCSentiment,
  NgGCSupportedModels,
  SentimentAnalyzerComponent,
} from '@codewithahsan/ng-gc';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    SentimentAnalyzerComponent,
    ReactiveFormsModule,
    JsonPipe,
    NgClass,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  fb = inject(FormBuilder);
  geminiService = inject(GeminiService);
  toastr = inject(ToastrService);
  form = this.fb.nonNullable.group({
    inputTextVal: ['', Validators.required],
    model: [NgGCSupportedModels[1].name, Validators.required],
    showSentiment: [true],
    showMessage: [true],
    additionalContext: [
      "And I want you to analyze the sentiment of the text written by a user for commenting. We're not going to allow posting comments over intensity of 0.7.",
    ],
  });
  models = NgGCSupportedModels;
  sentimentsHistory = signal<{ text: string; sentiment: NGGCSentiment }[]>([]);
  lastSentimentInput = signal('');
  typing = signal(false);

  sentimentComp = viewChild.required(SentimentAnalyzerComponent);

  watchSentiment = effect(
    () => {
      const sentiment = this.sentimentComp().sentiment();
      const text = this.lastSentimentInput();
      if (sentiment && text !== this.sentimentsHistory()[0]?.text) {
        console.log('sentiment: ', sentiment);
        this.sentimentsHistory.update((history) => {
          return [
            {
              text,
              sentiment,
            },
            ...history,
          ];
        });
        setTimeout(() => {
          console.log(JSON.stringify(this.sentimentsHistory()));
        }, 200);
      }
    },
    {
      allowSignalWrites: true,
    }
  );

  inputTextValDebounced = toSignal(
    this.form.controls.inputTextVal.valueChanges.pipe(
      debounceTime(1000),
      tap((val) => {
        this.typing.set(false);
        if (val) {
          this.lastSentimentInput.set(val);
        }
      })
    ),
    {
      initialValue: '',
    }
  );

  updateApiKey(apiKey: string, event: SubmitEvent): void {
    event.preventDefault();
    this.geminiService.geminiApiConfig.apiKey = apiKey;
  }

  postComment() {
    const inputValCtrl = this.form.controls.inputTextVal;
    inputValCtrl.reset();
    this.toastr.success('Comment posted');
  }
}
