import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { Validator } from 'class-validator'

/**
 * @description Function that validates if string is empty, email address, smtp address, or http address
 */
export function AddressUsernameValidator(): ValidatorFn {
  const validator = new Validator()
  return (control: AbstractControl): ValidationErrors | null => {
    const completeAddress = `${control.value}@example.com`
    if (validator.isEmail(completeAddress)) {
      // string is valid
      return null
    } else {
      // string is not an email or an url with a valid protocol
      return {
        AddressUsername: {
          valid: false,
        },
      }
    }
  }
}
