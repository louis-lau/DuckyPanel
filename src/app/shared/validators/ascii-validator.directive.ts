import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { Validator } from 'class-validator'

/**
 * @description Function that validates if string only ascii characters
 */
export function IsAsciiValidator(): ValidatorFn {
  const validator = new Validator()
  return (control: AbstractControl): ValidationErrors | null => {
    if (validator.isAscii(control.value)) {
      // string is valid
      return null
    } else {
      // string is not ascii
      return {
        isAscii: {
          valid: false,
        },
      }
    }
  }
}
