import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, ControlValueAccessor, Validators, NG_VALIDATORS, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { matchingInputsValidator } from './validators';

export interface PasswordFormValues {
  password: string | null;
  confirmPassword: string | null;
}

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.html',
  styleUrls: ['./password-form.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordForm),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordForm),
      multi: true,
    }
  ]
})
export class PasswordForm {
  subscriptions: Subscription[] = [];

  get value() {
    return this.form.value as PasswordFormValues;
  }

  set value(value: PasswordFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get passwordControl() {
    return this.form.controls['password'];
  }

  get confirmPasswordControl() {
    return this.form.controls['confirmPassword'];
  }

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validator: matchingInputsValidator('password', 'confirmPassword') });  

  constructor() {
    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { passwords: { valid: false, }, };
  }
}
