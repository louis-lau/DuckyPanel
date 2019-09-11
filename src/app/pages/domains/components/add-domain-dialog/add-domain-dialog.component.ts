import { HttpErrorResponse } from "@angular/common/http"
import { Component, Inject, OnInit } from "@angular/core"
import { FormControl, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material"
import { DomainsService } from "ducky-api-client-angular"
import { MatProgressButtonOptions } from "mat-progress-buttons"
import { ErrorSnackbarComponent } from "src/app/components/error-snackbar/error-snackbar.component"

@Component({
  selector: "app-add-domain-dialog",
  templateUrl: "./add-domain-dialog.component.html",
  styleUrls: ["./add-domain-dialog.component.scss"]
})
export class AddDomainDialogComponent implements OnInit {
  public constructor(
    public dialogRef: MatDialogRef<AddDomainDialogComponent>,
    private readonly domainsService: DomainsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  public cancelButtonConfig: MatProgressButtonOptions = {
    active: false,
    type: "button",
    text: "CANCEL"
  }
  public addButtonConfig: MatProgressButtonOptions = {
    active: false,
    disabled: true,
    text: "ADD",
    raised: true,
    buttonColor: "primary",
    spinnerColor: "accent",
    spinnerSize: 18,
    mode: "indeterminate"
  }
  public domainInput = new FormControl(
    "",
    Validators.pattern(new RegExp("(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\\.)+[a-zA-Z]{2,63}$)")) // valid fqdn
  )

  public ngOnInit(): void {
    this.domainInput.valueChanges.subscribe((): void => {
      this.addButtonConfig.disabled = this.domainInput.invalid
    })
  }

  public addDomain(): void {
    this.dialogRef.disableClose = true
    this.cancelButtonConfig.disabled = true
    this.addButtonConfig.active = true

    const accessToken = localStorage.getItem("access_token")
    this.domainsService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
    this.domainsService.domainsDomainPost(this.domainInput.value).subscribe(
      (): void => {
        this.dialogRef.close(true)
      },
      (error: HttpErrorResponse): void => {
        this.dialogRef.disableClose = false
        this.cancelButtonConfig.disabled = false
        this.addButtonConfig.active = false
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }
}
