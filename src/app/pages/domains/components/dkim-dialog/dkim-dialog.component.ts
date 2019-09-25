import { BreakpointObserver } from "@angular/cdk/layout"
import { HttpErrorResponse } from "@angular/common/http"
import { Component, Inject, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from "@angular/material"
import { ActivatedRoute, Router } from "@angular/router"
import { DKIMService, DomainsService, ForwardersService } from "ducky-api-client-angular"
import { MatProgressButtonOptions } from "mat-progress-buttons"
import { Subscription } from "rxjs"
import { AccountDialogComponent } from "src/app/pages/accounts/components/account-dialog/account-dialog.component"
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

  public cancelButtonConfig: MatProgressButtonOptions = {
    active: false,
    type: "button",
    text: "CANCEL"
  }

  public ngOnInit(): void {
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
