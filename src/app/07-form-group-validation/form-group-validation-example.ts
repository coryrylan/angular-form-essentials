import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchingInputsValidator } from './validators';

@Component({
  selector: 'app-form-group-validation-example',
  templateUrl: './form-group-validation-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class FormGroupValidationExample {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', Validators.required]
  }, { validators: matchingInputsValidator('password', 'confirm') });

  get passwordIsInvalid() {
    return this.form.controls.password.invalid && this.form.controls.password.touched;
  }

  get passwordsDoNotMatch() {
    return this.form.hasError('mismatch') && this.form.controls.confirm.touched;
  }

  submit() {
    console.log(this.form.value);
  }
}
