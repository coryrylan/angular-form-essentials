import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-html-forms-example',
  templateUrl: './html-forms-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class HtmlFormsExample {
  initialValue = 'Hello World';

  submit(event: any) {
    console.log(event);
  }
}
