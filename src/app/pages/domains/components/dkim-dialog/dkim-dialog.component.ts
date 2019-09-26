import { BreakpointObserver } from "@angular/cdk/layout"
import { HttpErrorResponse } from "@angular/common/http"
import { Component, Inject, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from "@angular/material"
import { ActivatedRoute, Router } from "@angular/router"
import { AddDkimDto, DKIMService, DomainsService, ForwardersService } from "ducky-api-client-angular"
import { MatProgressButtonOptions } from "mat-progress-buttons"
import { Subscription } from "rxjs"
import { AccountDialogComponent } from "src/app/pages/accounts/components/account-dialog/account-dialog.component"
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component"
import { DialogConfig } from "src/app/shared/components/dialog/dialog.interfaces"
import { ErrorSnackbarComponent } from "src/app/shared/components/error-snackbar/error-snackbar.component"

@Component({
  selector: "app-dkim-dialog",
  templateUrl: "./dkim-dialog.component.html",
  styleUrls: ["./dkim-dialog.component.scss"]
})
export class DkimDialogComponent implements OnInit {
  public constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private dkimService: DKIMService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
  public isModifyDialog: boolean
  public dkimForm: FormGroup = new FormGroup({
    selector: new FormControl(null),
    privateKey: new FormControl(null)
  })
  public dkimKeySubscription: Subscription

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

  public disableButtonConfig: MatProgressButtonOptions = {
    active: false,
    type: "button",
    text: "DISABLE",
    buttonColor: "warn",
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
    this.dkimForm.valueChanges.subscribe((): void => {
      this.saveButtonConfig.disabled = this.dkimForm.invalid || this.dkimForm.pristine
    })

    if (this.data.edit) {
      this.getDkim()
      this.isModifyDialog = true
    }
  }

  public getDkim(): void {
    const accessToken = localStorage.getItem("access_token")
    this.dkimService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
    this.dkimKeySubscription = this.dkimService.domainsDomainDkimGet(this.data.domain).subscribe(
      (dkimKey): void => {
        this.dkimForm.setValue({
          selector: dkimKey.selector,
          privateKey: null
        })
      },
      (error: HttpErrorResponse): void => {
        this.dialogRef.close()
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }

  public updateDkim(): void {
    this.dialogRef.disableClose = true
    this.cancelButtonConfig.disabled = true
    this.saveButtonConfig.active = true

    const dirtyValues: any = {}
    for (const key in this.dkimForm.controls) {
      const value = this.dkimForm.controls[key].value
      if (this.dkimForm.controls[key].dirty && value !== null && value !== "") {
        dirtyValues[key] = value
      }
    }

    const dkimKey: AddDkimDto = {
      selector: dirtyValues.selector,
      privateKey: dirtyValues.privateKey
    }

    this.dkimService.domainsDomainDkimPut(this.data.domain, dkimKey).subscribe(
      (): void => {
        this.dialogRef.close(true)
      },
      (error: HttpErrorResponse): void => {
        this.dialogRef.disableClose = false
        this.cancelButtonConfig.disabled = false
        this.saveButtonConfig.active = false
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }

  public disableDialog(): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: `Disable DKIM for ${this.data.domain}`,
        text: "Are you sure? This will also delete the private key from the server.",
        buttons: [
          {
            options: {
              active: false,
              text: "NO"
            }
          },
          {
            options: {
              active: false,
              text: "YES",
              buttonColor: "warn",
              spinnerSize: 18,
              mode: "indeterminate"
            },
            callback: (dialogRef: MatDialogRef<DialogComponent>): void => {
              dialogRef.disableClose = true
              dialogConfig.data.buttons[0].options.disabled = true
              dialogConfig.data.buttons[1].options.active = true

              const accessToken = localStorage.getItem("access_token")
              this.dkimService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
              this.dkimService.domainsDomainDkimDelete(this.data.domain).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`DKIM for ${this.data.domain} has been disabled`)
                  this.dialogRef.close(true)
                },
                (error: HttpErrorResponse): void => {
                  dialogRef.disableClose = false
                  dialogConfig.data.buttons[0].options.disabled = false
                  dialogConfig.data.buttons[1].options.active = false
                  this.snackBar.openFromComponent(ErrorSnackbarComponent, {
                    data: error,
                    panelClass: ["error-snackbar"]
                  })
                }
              )
            }
          }
        ]
      }
    }
    this.dialog.open(DialogComponent, dialogConfig)
  }
}

@Component({
  template: ""
})
export class DkimDialogEntryComponent implements OnInit {
  public constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}
  public ngOnInit(): void {
    this.route.params.subscribe((params): void => {
      this.dkimDialog(params["domain"], params["action"] === "edit")
    })
  }

  public dkimDialog(domain: string, edit = false): void {
    const dialog = this.dialog.open(DkimDialogComponent, {
      data: {
        domain: domain,
        edit: edit
      }
    })
    dialog.afterClosed().subscribe((result): void => {
      if (result) {
        this.router.navigateByUrl("/domains?refresh=true")
      } else {
        this.router.navigateByUrl("/domains")
      }
    })
  }
}
