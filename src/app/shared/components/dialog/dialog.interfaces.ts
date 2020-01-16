import { MatProgressButtonOptions } from 'mat-progress-buttons'

export interface DialogConfig {
  data: {
    title: string
    text: string
    buttons: {
      options: MatProgressButtonOptions
      callback?: Function
    }[]
  }
}
