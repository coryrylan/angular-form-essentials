import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Component({
  selector: 'app-forms-with-async-data-example',
  templateUrl: './forms-with-async-data-example.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class FormsWithAsyncDataExample {
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);

  get firstName() {
    return this.form.controls.firstName;
  }

  get lastName() {
    return this.form.controls.lastName;
  }

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    about: ['']
  });

  user = this.userService.loadUser().pipe(
    tap(user => this.form.patchValue(user))
  );

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
