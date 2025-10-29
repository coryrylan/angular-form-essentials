import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
import { ValidationMessage } from './validation-message';

@Component({
  selector: 'app-advanced-validation-management-example',
  templateUrl: './advanced-validation-management-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ValidationMessage]
})
export class AdvancedValidationManagementExample {
  userForm: any;

  formBuilder = inject(FormBuilder);

  constructor() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      profile: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      alert(`Name: ${this.userForm.value.name} Email: ${this.userForm.value.email}`);
    }
  }
}
