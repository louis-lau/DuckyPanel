import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"
import { Validator } from "class-validator"

/**
 * @description Function that validates if string is empty, email address, smtp address, or http address
 */
export function forwardingTargetValidator(): ValidatorFn {
  const validator = new Validator()
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      validator.isEmpty(control.value) ||
      validator.isEmail(control.value) ||
      validator.isURL(control.value, {
        protocols: ["http", "https", "smtp", "smtps"],
        // eslint-disable-next-line @typescript-eslint/camelcase
        require_protocol: true
      })
    ) {
      // string is valid
      return null
    } else {
      // string is not an email or an url with a valid protocol
      return {
        forwardingTarget: {
          valid: false
        }
      }
    }
  }
}
