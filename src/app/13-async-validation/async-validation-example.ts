import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UsernameService } from './username.service';

@Component({
  selector: 'app-async-validation-example',
  templateUrl: './async-validation-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [UsernameService]
})
export class AsyncValidationExample {
  formBuilder = inject(FormBuilder);
  usernameService = inject(UsernameService);

  form = this.formBuilder.group({
    userName: ['', Validators.required, usernameAvailableValidator(this.usernameService)]
  });

  get userName() {
    return this.form.controls.userName;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}

export function usernameAvailableValidator(usernameService: UsernameService) {
  return (control: FormControl): Observable<ValidationErrors | null> => {
    return usernameService.usernameAvailable(control.value).pipe(
      map(usernameAvailable => usernameAvailable ? null : { username: 'username taken' }),
      tap(v => console.log(v))
    );
  };
}
