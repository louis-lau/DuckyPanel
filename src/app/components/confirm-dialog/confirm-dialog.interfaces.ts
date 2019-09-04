export interface ConfirmDialogConfig {
  data: {
    title: string
    text: string
    buttons: {
      text: string
      color: "primary" | "accent" | "warn" | ""
      result?: boolean | string
    }[]
  }
}
