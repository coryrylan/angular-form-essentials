import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { passwordValidator } from './validators';

@Component({
  selector: 'app-custom-validation-example',
  templateUrl: './custom-validation-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CustomValidationExample {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    password: ['', [Validators.minLength(6), passwordValidator]]
  });

  get password() {
    return this.form.controls.password;
  }

  submit() {
    console.log(this.form.value);
  }
}
