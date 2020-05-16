import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { isAscii } from 'class-validator'

/**
 * @description Function that validates if string only ascii characters
 */
export function IsAsciiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isAscii(control.value)) {
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
