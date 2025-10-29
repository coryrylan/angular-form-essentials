import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from './switch/switch';

@Component({
  selector: 'app-custom-form-controls-example',
  templateUrl: './custom-form-controls-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SwitchComponent]
})
export class CustomFormControlsExample {
  formBuilder = inject(FormBuilder);
  value = false;
  myForm = this.formBuilder.group({
    mySwitch: [true]
  });

  submit() {
    console.log(`Value: ${this.myForm.controls.mySwitch.value}`);
  }
}
