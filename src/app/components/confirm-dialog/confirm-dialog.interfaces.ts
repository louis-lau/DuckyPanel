import { MatProgressButtonOptions } from "mat-progress-buttons"

export interface ConfirmDialogConfig {
  data: {
    title: string
    text: string
    buttons: {
      options: MatProgressButtonOptions
      callback?: Function
    }[]
  }
}
