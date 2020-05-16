import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { isEmail } from 'class-validator'

/**
 * @description Function that validates if string is empty, email address, smtp address, or http address
 */
export function AddressUsernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const completeAddress = `${control.value}@example.com`
    if (isEmail(completeAddress)) {
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
