import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NGGC_API_CONFIG,
  NgGCSupportedModels,
  SentimentAnalyzerComponent,
} from '@codewithahsan/ng-gc';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map } from 'rxjs';
@Component({
  standalone: true,
  imports: [RouterModule, SentimentAnalyzerComponent, ReactiveFormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  fb = inject(FormBuilder);
  config = inject(NGGC_API_CONFIG);
  form = this.fb.nonNullable.group({
    inputTextVal: ['', Validators.required],
    model: [NgGCSupportedModels[1].name, Validators.required],
  });
  models = NgGCSupportedModels;
  sentimentConfig = toSignal(
    this.form.controls.model.valueChanges.pipe(
      map((val) => ({
        model: val,
      }))
    ),
    {
      initialValue: {
        model: NgGCSupportedModels[1].name,
      },
    }
  );
  inputTextValDebounced = toSignal(
    this.form.controls.inputTextVal.valueChanges.pipe(debounceTime(1000)),
    {
      initialValue: '',
    }
  );

  reloadApp() {
    window.location.reload();
  }
}
