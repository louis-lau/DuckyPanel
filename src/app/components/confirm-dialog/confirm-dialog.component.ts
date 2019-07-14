import { Component, Inject } from "@angular/core"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"

@Component({
  selector: "confirm-dialog",
  templateUrl: "confirm-dialog.component.html",
  styleUrls: ["confirm-dialog.component.scss"]
})
export class ConfirmDialogComponent {
  public constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {}
}
