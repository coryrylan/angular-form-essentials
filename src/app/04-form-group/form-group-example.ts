import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-group-example',
  templateUrl: './form-group-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class FormGroupExample {
  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get email() {
    return this.form.controls.email;
  }

  submit() {
    console.log(this.form);
  }
}
