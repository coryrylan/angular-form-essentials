import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService, ValidationErrorTypes } from './validation.service';

@Component({
  selector: 'app-validation-message',
  template: `
    @if (errorMessage !== null) {
      <div class="error">{{errorMessage}}</div>
    }
  `,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ValidationMessage {
  @Input() control: FormControl | null = null;

  get errorMessage() {
    let errorMessage = null;

    if (this.control !== null) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          errorMessage = ValidationService.getValidatorErrorMessage(propertyName as ValidationErrorTypes, this.control.errors[propertyName]);
        }
      }
    }

    return errorMessage;
  }
}
