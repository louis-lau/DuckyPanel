import { HttpErrorResponse } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material'
import { DomainsService } from 'ducky-api-client-angular'
import { MatProgressButtonOptions } from 'mat-progress-buttons'
import { Subscription } from 'rxjs'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

@Component({
  selector: 'app-add-alias-dialog',
  templateUrl: './add-alias-dialog.component.html',
  styleUrls: ['./add-alias-dialog.component.scss'],
})
export class AddAliasDialogComponent implements OnInit {
  public constructor(
    public dialogRef: MatDialogRef<AddAliasDialogComponent>,
    private readonly domainsService: DomainsService,
    private snackBar: MatSnackBar,
    private errorSnackbarService: ErrorSnackbarService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  public domainsSubscription: Subscription
  public domains: string[]

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
    existingDomain: new FormControl(null),
    aliasDomain: new FormControl(
      '',
      Validators.pattern(new RegExp('(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\\.)+[a-zA-Z]{2,63}$)')),
    ),
  })

  public ngOnInit(): void {
    this.getDomains()
    this.aliasForm.valueChanges.subscribe((): void => {
      this.addButtonConfig.disabled = this.aliasForm.invalid
    })
  }

  public getDomains(): void {
    this.domainsSubscription = this.domainsService.getDomains().subscribe(
      (domains): void => {
        this.domains = domains.map((value): string => value.domain)
      },
      (error: HttpErrorResponse): void => {
        this.dialogRef.close()
        this.errorSnackbarService.open(error)
      },
    )
  }

  public addAlias(): void {
    this.dialogRef.disableClose = true
    this.cancelButtonConfig.disabled = true
    this.addButtonConfig.active = true

    this.domainsService
      .addAlias(this.aliasForm.controls['existingDomain'].value, {
        domain: this.aliasForm.controls['aliasDomain'].value,
      })
      .subscribe(
        (): void => {
          this.dialogRef.close(true)
          this.snackBar.open(`${this.aliasForm.controls['aliasDomain'].value} successfully added`, undefined, {
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
