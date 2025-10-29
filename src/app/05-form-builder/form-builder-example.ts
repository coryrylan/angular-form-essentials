import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-builder-example',
  templateUrl: './form-builder-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class FormBuilderExample {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
  });

  get email() {
    return this.form.controls.email;
  }

  submit() {
    console.log(this.form.value);
  }
}
