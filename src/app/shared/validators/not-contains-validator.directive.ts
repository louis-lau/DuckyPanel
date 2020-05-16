import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { notContains } from 'class-validator'

/**
 * @description Function that validates if string does not contain the given seed
 */
export function notContainsValidator(seed: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (notContains(control.value, seed)) {
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
