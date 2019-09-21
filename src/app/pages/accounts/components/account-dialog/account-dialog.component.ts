import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { HttpErrorResponse } from "@angular/common/http"
import { Component, Inject, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material"
import {
  AccountDetails,
  CreateAccountDto,
  DomainsService,
  EmailAccountsService,
  UpdateAccountDto
} from "ducky-api-client-angular"
import { MatProgressButtonOptions } from "mat-progress-buttons"
import { Observable, Subscription } from "rxjs"
import { map } from "rxjs/operators"
import { ErrorSnackbarComponent } from "src/app/shared/components/error-snackbar/error-snackbar.component"
import { AddressUsernameValidator } from "src/app/shared/validators/address-username-validator.directive"

@Component({
  selector: "app-account-dialog",
  templateUrl: "./account-dialog.component.html",
  styleUrls: ["./account-dialog.component.scss"]
})
export class AccountDialogComponent implements OnInit {
  public constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    private breakpointObserver: BreakpointObserver,
    private readonly domainsService: DomainsService,
    private readonly emailAccountsService: EmailAccountsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  public isModifyDialog: boolean
  public domains: string[]
  public domainsSubscription: Subscription
  public accountDetails: AccountDetails
  public accountDetailsSubscription: Subscription
  public math: Math = Math

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

  public accountForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    spamLevel: new FormControl(50, [Validators.min(0), Validators.max(100)]),
    disabledScopes: new FormControl(null),
    addressUser: new FormControl(null, AddressUsernameValidator()),
    domain: new FormControl(null),
    password: new FormControl(null, Validators.minLength(8)),
    quota: new FormControl(null, Validators.min(0)),
    sendLimit: new FormControl(null, [Validators.min(1), Validators.max(300)]),
    receiveLimit: new FormControl(null, Validators.min(0)),
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
    this.accountForm.valueChanges.subscribe((): void => {
      this.saveButtonConfig.disabled = this.accountForm.invalid || this.accountForm.pristine
    })

    // If id was passed this is a modify dialog, otherwise it is a create dialog
    if (this.data) {
      this.isModifyDialog = true
      this.getAccount()
    } else {
      this.getDomains()
    }
  }

  public forceCheckForm(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched()
    }
  }

  public getAccount(): void {
    this.accountForm.controls["addressUser"].disable()
    this.accountForm.controls["domain"].disable()

    const accessToken = localStorage.getItem("access_token")
    this.emailAccountsService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
    this.accountDetailsSubscription = this.emailAccountsService.accountsAccountIdGet(this.data.id).subscribe(
      (account): void => {
        this.accountDetails = account
        // Split address to name and domain for split input
        const addressUser = this.accountDetails.address.substring(0, this.accountDetails.address.lastIndexOf("@"))
        this.domains = [this.accountDetails.address.substring(this.accountDetails.address.lastIndexOf("@") + 1)]

        this.accountForm.setValue({
          name: account.name,
          spamLevel: account.spamLevel,
          disabledScopes: account.disabledScopes,
          addressUser: addressUser,
          domain: this.domains[0],
          password: null,
          quota: Math.round(account.limits.quota.allowed / (1024 ^ 2)),
          sendLimit: account.limits.send.allowed,
          receiveLimit: account.limits.receive.allowed,
          forwardLimit: account.limits.forward.allowed
        })
      },
      (error: HttpErrorResponse): void => {
        this.dialogRef.close()
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
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

  public updateAccount(): void {
    this.dialogRef.disableClose = true
    this.cancelButtonConfig.disabled = true
    this.saveButtonConfig.active = true

    const dirtyValues: any = {}
    for (const key in this.accountForm.controls) {
      const value = this.accountForm.controls[key].value
      if (this.accountForm.controls[key].dirty && value !== null && value !== "") {
        dirtyValues[key] = value
      }
    }

    const account: CreateAccountDto | UpdateAccountDto = {
      name: dirtyValues.name,
      spamLevel: dirtyValues.spamLevel,
      disabledScopes: dirtyValues.disabledScopes,
      address: dirtyValues.addressUser ? `${dirtyValues.addressUser}@${dirtyValues.domain}` : undefined,
      password: dirtyValues.password,
      limits: {
        quota: dirtyValues.quota ? dirtyValues.quota * (1024 ^ 2) : undefined,
        send: dirtyValues.sendLimit,
        receive: dirtyValues.receiveLimit,
        forward: dirtyValues.forwardLimit
      }
    }

    const onError = (error: HttpErrorResponse): void => {
      this.dialogRef.disableClose = false
      this.cancelButtonConfig.disabled = false
      this.saveButtonConfig.active = false
      this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
    }

    if (this.isModifyDialog) {
      delete account.address
      this.emailAccountsService.accountsAccountIdPut(this.data.id, account).subscribe((): void => {
        this.dialogRef.close(true)
      }, onError)
    } else {
      this.emailAccountsService.accountsPost(account).subscribe((): void => {
        this.dialogRef.close(true)
      }, onError)
    }
  }
}
