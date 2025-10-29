import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-forms-example',
  templateUrl: './template-forms-example.html',
  imports: [CommonModule, FormsModule]
})
export class TemplateFormsExample {
  search = 'angular';

  submit(form: NgForm) {
    console.log(form.value);
  }
}
