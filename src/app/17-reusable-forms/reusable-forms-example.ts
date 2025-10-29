import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordForm } from './password-form/password-form';
import { ProfileForm } from './profile-form/profile-form';

@Component({
  selector: 'app-reusable-forms-example',
  templateUrl: './reusable-forms-example.html',
  styleUrls: ['./reusable-forms-example.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PasswordForm, ProfileForm]
})
export class ReusableFormsExample {
  formBuilder = inject(FormBuilder);

  signupForm = this.formBuilder.group({
    password: [],
    profile: []
  });

  submit() {
    console.log(this.signupForm.value);
  }

  resetForm() {
    this.signupForm.reset();
  }
}
