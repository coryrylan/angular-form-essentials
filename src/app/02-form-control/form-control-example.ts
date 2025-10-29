import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-control-example',
  templateUrl: './form-control-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class FormControlExample {
  name = new FormControl('Angular Forms Rock!');
}
