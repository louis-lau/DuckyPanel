import { HttpErrorResponse } from "@angular/common/http"
import { Component, Inject } from "@angular/core"
import { FormControl } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material"
import { Router } from "@angular/router"
import { DomainsService } from "ducky-api-client-angular"
import { MatProgressButtonOptions } from "mat-progress-buttons"

@Component({
  selector: "app-add-domain-dialog",
  templateUrl: "./add-domain-dialog.component.html",
  styleUrls: ["./add-domain-dialog.component.scss"]
})
export class AddDomainDialogComponent {
  public cancelButtonConfig: MatProgressButtonOptions = {
    active: false,
    text: "CANCEL"
  }
  public addButtonConfig: MatProgressButtonOptions = {
    active: false,
    text: "ADD",
    raised: true,
    buttonColor: "primary",
    spinnerColor: "accent",
    spinnerSize: 18,
    mode: "indeterminate"
  }
  public domainInput = new FormControl()

  public constructor(
    public dialogRef: MatDialogRef<AddDomainDialogComponent>,
    private readonly domainsService: DomainsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

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
        this.dialogRef.close()
        if ((error.error.error = "Unauthorized")) {
          this.router.navigateByUrl("/login")
        }
      }
    )
  }
}
