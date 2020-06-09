import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { EmailAccountsService as ApiAccountsService } from 'duckyapi-angular'
import { MatProgressButtonOptions } from 'mat-progress-buttons'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DomainsService } from 'src/app/pages/domains/domains.service'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'
import { AddressUsernameValidator } from 'src/app/shared/validators/address-username-validator.directive'

@Component({
  selector: 'app-add-alias-dialog',
  templateUrl: './account-alias-dialog.component.html',
  styleUrls: ['./account-alias-dialog.component.scss'],
})
export class AccountAliasDialogComponent implements OnInit {
  public constructor(
    public dialogRef: MatDialogRef<AccountAliasDialogComponent>,
    private breakpointObserver: BreakpointObserver,
    public apiAccountsService: ApiAccountsService,
    public domainsService: DomainsService,
    private snackBar: MatSnackBar,
    private errorSnackbarService: ErrorSnackbarService,
    @Inject(MAT_DIALOG_DATA)
    public data: string,
  ) {}
  public cancelButtonConfig: MatProgressButtonOptions = {
    active: false,
    type: 'button',
    text: 'CANCEL',
  }
  public addButtonConfig: MatProgressButtonOptions = {
    active: false,
    disabled: true,
    text: 'ADD',
    raised: true,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    spinnerSize: 18,
    mode: 'indeterminate',
  }
  public aliasForm = new FormGroup({
    name: new FormControl(null),
    addressUser: new FormControl(null, AddressUsernameValidator()),
    domain: new FormControl(null),
  })

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

  ngOnInit(): void {
    this.aliasForm.valueChanges.subscribe((): void => {
      this.addButtonConfig.disabled = this.aliasForm.invalid || this.aliasForm.pristine
    })
  }

  public addAlias(): void {
    this.dialogRef.disableClose = true
    this.cancelButtonConfig.disabled = true
    this.addButtonConfig.active = true

    this.apiAccountsService
      .addAccountAlias(this.data, {
        name: this.aliasForm.controls['name'].value,
        address: `${this.aliasForm.controls['addressUser'].value}@${this.aliasForm.controls['domain'].value}`,
      })
      .subscribe(
        (): void => {
          const address = `${this.aliasForm.controls['addressUser'].value}@${this.aliasForm.controls['domain'].value}`
          this.dialogRef.close(true)
          this.snackBar.open(`${address} successfully added`, undefined, {
            panelClass: 'success-snackbar',
          })
        },
        (error: HttpErrorResponse): void => {
          this.dialogRef.disableClose = false
          this.cancelButtonConfig.disabled = false
          this.addButtonConfig.active = false
          this.errorSnackbarService.open(error)
        },
      )
  }
}
