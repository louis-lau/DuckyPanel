import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { HttpErrorResponse } from "@angular/common/http"
import { Component, OnInit, ViewChild } from "@angular/core"
import { MatDialog, MatDialogRef, MatSnackBar, MatSort, MatTableDataSource } from "@angular/material"
import { Forwarder, ForwardersService } from "ducky-api-client-angular"
import { Observable, Subscription } from "rxjs"
import { map } from "rxjs/operators"
import { DialogComponent } from "src/app/components/dialog/dialog.component"
import { DialogConfig } from "src/app/components/dialog/dialog.interfaces"
import { ErrorSnackbarComponent } from "src/app/components/error-snackbar/error-snackbar.component"

@Component({
  selector: "app-forwarders",
  templateUrl: "./forwarders.component.html",
  styleUrls: ["./forwarders.component.scss"]
})
export class ForwardersComponent implements OnInit {
  public constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private readonly forwardersService: ForwardersService
  ) {}

  public displayedColumns = ["address", "actions"]
  public dataSource: MatTableDataSource<Forwarder>
  public forwarderSubscription: Subscription
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

  @ViewChild(MatSort, { static: false })
  private set content(sort: MatSort) {
    // Needed because of the ngif wrapper around the table
    if (this.dataSource) {
      this.dataSource.sort = sort
    }
  }

  public ngOnInit(): void {
    this.getForwarders()
  }

  public getForwarders(): void {
    const accessToken = localStorage.getItem("access_token")
    this.forwardersService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
    this.forwarderSubscription = this.forwardersService.forwardersGet().subscribe(
      (forwarders): void => {
        this.dataSource = new MatTableDataSource(forwarders)
      },
      (error: HttpErrorResponse): void => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }

  public removeConfirmDialog(forwarderId: string, address?: string): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: `Remove ${address || forwarderId}`,
        text: "Are you sure?",
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
              this.forwardersService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
              this.forwardersService.forwardersForwarderIdDelete(forwarderId).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${address || forwarderId} has been removed`)
                  this.getForwarders()
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
