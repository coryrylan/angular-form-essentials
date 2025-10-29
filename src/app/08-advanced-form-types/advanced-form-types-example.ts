import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-advanced-form-types-example',
  templateUrl: './advanced-form-types-example.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class AdvancedFormTypesExample {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: [''],
    color: ['#ff0000'],
    password: [''],
    age: [100],
    date: [new Date()],
    subscribe: [true],
    memory: [32],
    distance: [50],
    region: ['south-america']
  });

  submit() {
    console.log(this.form.value);
  }
}
