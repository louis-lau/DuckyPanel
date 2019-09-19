import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { HttpErrorResponse } from "@angular/common/http"
import { Component, Inject, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef, MatSnackBar } from "@angular/material"
import { DomainsService, ForwarderDetails, ForwardersService } from "ducky-api-client-angular"
import { MatProgressButtonOptions } from "mat-progress-buttons"
import { Observable, Subscription } from "rxjs"
import { map } from "rxjs/operators"
import { ErrorSnackbarComponent } from "src/app/components/error-snackbar/error-snackbar.component"
import { AccountDialogComponent } from "src/app/pages/accounts/components/account-dialog/account-dialog.component"

@Component({
  selector: "app-forwarder-dialog",
  templateUrl: "./forwarder-dialog.component.html",
  styleUrls: ["./forwarder-dialog.component.scss"]
})
export class ForwarderDialogComponent implements OnInit {
  public constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    private breakpointObserver: BreakpointObserver,
    private readonly domainsService: DomainsService,
    private readonly forwardersService: ForwardersService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
  public isModifyDialog: boolean
  public domainsSubscription: Subscription
  public forwarderDetails: ForwarderDetails
  public forwarderDetailsSubscription: Subscription
  public domains: string[]
  public forwardTargets: string[] = []

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

  public forwarderForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    addressUser: new FormControl(null, Validators.pattern(new RegExp("^((?!(\\.\\.)|(^\\.)).)*$"))),
    domain: new FormControl(null),
    forwardLimit: new FormControl(null, [Validators.min(1), Validators.max(200)])
  })

  public saveButtonConfig: MatProgressButtonOptions = {
    active: false,
    text: "SAVE",
    disabled: true,
    raised: true,
    buttonColor: "primary",
    spinnerColor: "accent",
    spinnerSize: 18,
    mode: "indeterminate"
  }

  public cancelButtonConfig: MatProgressButtonOptions = {
    active: false,
    type: "button",
    text: "CANCEL"
  }

  public ngOnInit(): void {
    this.forwarderForm.valueChanges.subscribe((): void => {
      this.saveButtonConfig.disabled = this.forwarderForm.invalid || this.forwarderForm.pristine
    })

    this.getDomains()

    // If id was passed this is a modify dialog and we need to get existing data
    if (this.data) {
      this.isModifyDialog = true
      this.getForwarder()
    }
  }

  public addTarget(event: MatChipInputEvent): void {
    if ((event.value || "").trim()) {
      this.forwardTargets.push(event.value.trim())
    }

    // Reset the input value
    if (event.input) {
      event.input.value = ""
    }
  }

  public removeTarget(target: string): void {
    console.log(target)
    const index = this.forwardTargets.indexOf(target)

    if (index >= 0) {
      this.forwardTargets.splice(index, 1)
    }
  }

  public getDomains(): void {
    const accessToken = localStorage.getItem("access_token")
    this.domainsService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
    this.domainsSubscription = this.domainsService.domainsGet().subscribe(
      (domains): void => {
        this.domains = domains.map((value): string => value.domain)
      },
      (error: HttpErrorResponse): void => {
        this.dialogRef.close()
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }

  public getForwarder(): void {
    const accessToken = localStorage.getItem("access_token")
    this.forwardersService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
    this.forwarderDetailsSubscription = this.forwardersService.forwardersForwarderIdGet(this.data.id).subscribe(
      (forwarder): void => {
        this.forwarderDetails = forwarder
        // Split address to name and domain for split input
        const addressUser = this.forwarderDetails.address.substring(0, this.forwarderDetails.address.lastIndexOf("@"))
        const domain = this.forwarderDetails.address.substring(this.forwarderDetails.address.lastIndexOf("@") + 1)

        this.forwarderForm.setValue({
          name: forwarder.name,
          addressUser: addressUser,
          domain: domain,
          forwardLimit: forwarder.limits.forward.allowed
        })
        this.forwardTargets = forwarder.targets
      },
      (error: HttpErrorResponse): void => {
        this.dialogRef.close()
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }
}
