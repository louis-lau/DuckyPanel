import { HttpErrorResponse } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { AddDkimDto, DkimService } from 'duckyapi-angular'
import { MatProgressButtonOptions } from 'mat-progress-buttons'
import { Subscription } from 'rxjs'
import { AccountDialogComponent } from 'src/app/pages/accounts/components/account-dialog/account-dialog.component'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { DialogConfig } from 'src/app/shared/components/dialog/dialog.interfaces'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

import { DomainsService } from '../../domains.service'

@Component({
  selector: 'app-dkim-dialog',
  templateUrl: './dkim-dialog.component.html',
  styleUrls: ['./dkim-dialog.component.scss'],
})
export class DkimDialogComponent implements OnInit {
  public constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    public dialog: MatDialog,
    private dkimService: DkimService,
    private snackBar: MatSnackBar,
    private errorSnackbarService: ErrorSnackbarService,
    @Inject(MAT_DIALOG_DATA)
    public data,
  ) {}
  public isModifyDialog: boolean
  public dkimForm: FormGroup = new FormGroup({
    selector: new FormControl(null),
    privateKey: new FormControl(null),
  })
  public dkimKeySubscription: Subscription

  public saveButtonConfig: MatProgressButtonOptions = {
    active: false,
    text: 'SAVE',
    disabled: true,
    raised: true,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    spinnerSize: 18,
    mode: 'indeterminate',
  }

  public disableButtonConfig: MatProgressButtonOptions = {
    active: false,
    type: 'button',
    text: 'DISABLE',
    buttonColor: 'warn',
    spinnerColor: 'accent',
    spinnerSize: 18,
    mode: 'indeterminate',
  }

  public cancelButtonConfig: MatProgressButtonOptions = {
    active: false,
    type: 'button',
    text: 'CANCEL',
  }

  public ngOnInit(): void {
    this.dkimForm.valueChanges.subscribe((): void => {
      if (!this.isModifyDialog || this.dkimKeySubscription.closed) {
        this.saveButtonConfig.disabled = this.dkimForm.invalid || this.dkimForm.pristine
      }
    })

    if (this.data.edit) {
      this.getDkim()
      this.isModifyDialog = true
    }
  }

  public getDkim(): void {
    this.dkimKeySubscription = this.dkimService.getDkim(this.data.domain).subscribe(
      (dkimKey): void => {
        this.dkimForm.setValue({
          selector: dkimKey.selector,
          privateKey: null,
        })
      },
      (error: HttpErrorResponse): void => {
        this.dialogRef.close()
        this.errorSnackbarService.open(error)
      },
    )
  }

  public updateDkim(): void {
    this.dialogRef.disableClose = true
    this.cancelButtonConfig.disabled = true
    this.saveButtonConfig.active = true

    const dirtyValues: any = {}
    for (const key in this.dkimForm.controls) {
      const value = this.dkimForm.controls[key].value
      if (this.dkimForm.controls[key].dirty && value !== null && value !== '') {
        dirtyValues[key] = value
      }
    }

    const dkimKey: AddDkimDto = {
      selector: dirtyValues.selector,
      privateKey: dirtyValues.privateKey,
    }

    this.dkimService.updateDkim(this.data.domain, dkimKey).subscribe(
      (): void => {
        this.dialogRef.close(true)
        this.snackBar.open(`DKIM for ${this.data.domain} ${this.isModifyDialog ? 'updated' : 'enabled'}`, undefined, {
          panelClass: 'success-snackbar',
        })
      },
      (error: HttpErrorResponse): void => {
        this.dialogRef.disableClose = false
        this.cancelButtonConfig.disabled = false
        this.saveButtonConfig.active = false
        this.errorSnackbarService.open(error)
      },
    )
  }

  public forceCheckForm(): void {
    if (this.dkimForm.invalid) {
      this.dkimForm.markAllAsTouched()
    }
  }

  public disableDialog(): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: `Disable DKIM for ${this.data.domain}`,
        text: 'Are you sure? This will also delete the private key from the server.',
        buttons: [
          {
            options: {
              active: false,
              text: 'NO',
            },
          },
          {
            options: {
              active: false,
              text: 'YES',
              buttonColor: 'warn',
              spinnerSize: 18,
              mode: 'indeterminate',
            },
            callback: (dialogRef: MatDialogRef<DialogComponent>): void => {
              dialogRef.disableClose = true
              dialogConfig.data.buttons[0].options.disabled = true
              dialogConfig.data.buttons[1].options.active = true

              this.dkimService.deleteDkim(this.data.domain).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`DKIM for ${this.data.domain} has been disabled`, undefined, {
                    panelClass: 'success-snackbar',
                  })
                  this.dialogRef.close(true)
                },
                (error: HttpErrorResponse): void => {
                  dialogRef.disableClose = false
                  dialogConfig.data.buttons[0].options.disabled = false
                  dialogConfig.data.buttons[1].options.active = false
                  this.errorSnackbarService.open(error)
                },
              )
            },
          },
        ],
      },
    }
    this.dialog.open(DialogComponent, dialogConfig)
  }
}

@Component({
  template: '',
})
export class DkimDialogEntryComponent implements OnInit {
  public constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public domainService: DomainsService,
  ) {}
  public ngOnInit(): void {
    this.route.params.subscribe((params): void => {
      this.dkimDialog(params['domain'], params['action'] === 'edit')
    })
  }

  public dkimDialog(domain: string, edit = false): void {
    const dialog = this.dialog.open(DkimDialogComponent, {
      data: {
        domain: domain,
        edit: edit,
      },
    })
    dialog.afterClosed().subscribe((result): void => {
      if (result) {
        this.domainService.getDomains()
      }
      this.router.navigateByUrl('/domains')
    })
  }
}
