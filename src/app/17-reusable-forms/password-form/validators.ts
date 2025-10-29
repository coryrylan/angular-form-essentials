import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export function matchingInputsValidator(firstKey: string, secondKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.get(firstKey)?.value !== control.get(secondKey)?.value) {
      return {
        'mismatch': true
      };
    } else {
      return null;
    }
  };
}
