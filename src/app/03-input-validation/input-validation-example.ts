import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-validation-example',
  templateUrl: './input-validation-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class InputValidationExample {
  email = new FormControl('', [Validators.required, Validators.email]);
}
