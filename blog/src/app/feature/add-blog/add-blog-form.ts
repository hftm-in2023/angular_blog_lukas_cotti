import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-blog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-blog-form.html',
})
export class AddBlogFormComponent {
  @Input() form!: FormGroup;
  @Input() saving = false;
  @Input() saveError: string | null = null;

  @Output() submitForm = new EventEmitter<void>();
  @Output() resetForm = new EventEmitter<void>();

  onSubmit() {
    this.submitForm.emit();
  }

  onReset() {
    this.resetForm.emit();
  }
}
