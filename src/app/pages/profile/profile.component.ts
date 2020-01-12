import { HttpErrorResponse } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material"
import { Router } from "@angular/router"
import { AuthenticationService, EmailAccountsService } from "ducky-api-client-angular"
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component"
import { DialogConfig } from "src/app/shared/components/dialog/dialog.interfaces"
import { ErrorSnackbarComponent } from "src/app/shared/components/error-snackbar/error-snackbar.component"
import { formatBytes } from "src/app/shared/functions/formatBytes.function"

import { ProfileService } from "./profile.service"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public constructor(
    private profileService: ProfileService,
    private authenticationService: AuthenticationService,
    private emailAccountsService: EmailAccountsService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}
  public usage = {
    bytes: 0,
    formatted: "0 Bytes"
  }

  public ngOnInit(): void {
    this.calculateStorage()
  }

  public calculateStorage(): void {
    this.usage.bytes = 0
    this.emailAccountsService.accountsGet().subscribe((accounts): void => {
      for (const account of accounts) {
        this.usage.bytes += account.quota.used
      }
      this.usage.formatted = formatBytes(this.usage.bytes)
    })
  }

  public logout(): void {
    localStorage.removeItem("access_token")
    delete this.authenticationService.configuration.apiKeys
    this.snackBar.open("Logged out successfully", undefined, {
      panelClass: "success-snackbar"
    })
    this.router.navigateByUrl("/login")
  }

  public logoutAllDialog(): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: "Log out from all devices",
        text: "Are you sure? This will also log you out on this device.",
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

              this.authenticationService.authenticationDelete().subscribe(
                (): void => {
                  dialogRef.close()
                  this.logout()
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
