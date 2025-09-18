import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AddBlogFormComponent } from './add-blog-form';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of, Observable, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AddBlogFormComponent,
  ],
  templateUrl: './add-blog-page.html',
  styleUrls: ['./add-blog-page.scss'],
})
export default class AddBlogPage {
  form = this.fb.group({
    title: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
        asyncValidators: [this.titleUniqueValidator()],
        updateOn: 'blur',
      },
    ],
    content: ['', [Validators.required, Validators.minLength(10)]],
  });

  saving = false;
  saveError: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  /** asynchroner Validator: prüft ob Titel schon existiert */
  private titleUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const title = control.value;
      if (!title || title.length < 3) return of(null);

      return timer(300).pipe(
        switchMap(() =>
          this.http
            .get<{ exists: boolean }>(
              `/api/blogs/check-title?title=${encodeURIComponent(title)}`
            )
            .pipe(
              map((resp) => (resp && resp.exists ? { titleTaken: true } : null)),
              catchError(() => of(null)) // bei Fehlern nicht blockieren
            )
        )
      );
    };
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.saving = true;
    this.saveError = null;

    const payload = {
      title: this.form.value.title,
      content: this.form.value.content,
    };

    this.http
      .post('/api/blogs', payload)
      .pipe(
        catchError((err) => {
          this.saveError = 'Fehler beim Speichern. Versuche es später.';
          return of(null);
        })
      )
      .subscribe((res) => {
        this.saving = false;
        if (res) {
          this.form.reset(); // bei Erfolg zurücksetzen
        }
      });
  }

  onReset() {
    this.form.reset();
    this.saveError = null;
  }
}
