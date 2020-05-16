import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { isEmail, isEmpty, isURL } from 'class-validator'

/**
 * @description Function that validates if string is empty, email address, smtp address, or http address
 */
export function forwardingTargetValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      isEmpty(control.value) ||
      isEmail(control.value) ||
      isURL(control.value, {
        protocols: ['http', 'https', 'smtp', 'smtps'],
        // eslint-disable-next-line @typescript-eslint/camelcase
        require_protocol: true,
      })
    ) {
      // string is valid
      return null
    } else {
      // string is not an email or an url with a valid protocol
      return {
        forwardingTarget: {
          valid: false,
        },
      }
    }
  }
}
