import { Component, Inject } from "@angular/core"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"

export interface ConfirmDialogConfig {
  data: {
    title: string
    text: string
    buttons: {
      text: string
      color: "primary" | "accent" | "warn"
      result?: boolean | string
    }[]
  }
}

@Component({
  selector: "confirm-dialog",
  templateUrl: "confirm-dialog.component.html",
  styleUrls: ["confirm-dialog.component.scss"]
})
export class ConfirmDialogComponent {
  public constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

  public onNoClick(): void {
    this.dialogRef.close()
  }
}
