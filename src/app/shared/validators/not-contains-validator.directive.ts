import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { Validator } from 'class-validator'

/**
 * @description Function that validates if string does not contain the given seed
 */
export function notContainsValidator(seed: string): ValidatorFn {
  const validator = new Validator()
  return (control: AbstractControl): ValidationErrors | null => {
    if (validator.notContains(control.value, seed)) {
      // string is valid
      return null
    } else {
      // string is not ascii
      return {
        notContains: {
          valid: false,
        },
      }
    }
  }
}
