import { FormArray, ValidatorFn, AbstractControl } from '@angular/forms';

export function minSelectedCheckboxes(min = 1): ValidatorFn {
  return (control: AbstractControl) => {
    const totalSelected = (control as FormArray).controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };
}
