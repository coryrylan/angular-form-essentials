import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, Validators, FormControl, NG_VALIDATORS, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface ProfileFormValues {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.html',
  styleUrls: ['./profile-form.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileForm),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileForm),
      multi: true,
    }
  ]
})
export class ProfileForm {
  subscriptions: Subscription[] = [];

  get value(): ProfileFormValues {
    return this.form.value as ProfileFormValues;
  }

  set value(value: ProfileFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl() {
    return this.form.controls.email;
  }

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', Validators.required]
  });

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

  onChange: any = () => { };
  onTouched: any = () => { };

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
    return this.form.valid ? null : { profile: { valid: false, }, };
  }
}
