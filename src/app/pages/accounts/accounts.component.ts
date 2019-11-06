import { HttpErrorResponse } from "@angular/common/http"
import { Component, OnInit, ViewChild } from "@angular/core"
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from "@angular/material"
import { ActivatedRoute, Router } from "@angular/router"
import { AccountListItem, EmailAccountsService } from "ducky-api-client-angular"
import { Subscription } from "rxjs"
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component"
import { DialogConfig } from "src/app/shared/components/dialog/dialog.interfaces"
import { ErrorSnackbarComponent } from "src/app/shared/components/error-snackbar/error-snackbar.component"

import { AccountListItemFormatted } from "./accounts.interfaces"
import { AccountDialogComponent } from "./components/account-dialog/account-dialog.component"

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit {
  public constructor(
    public dialog: MatDialog,
    private readonly accountsService: EmailAccountsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  private displayedColumns = ["address", "name", "quotaUsedFormatted", "quotaAllowedFormatted", "actions"]
  private dataSource: MatTableDataSource<AccountListItemFormatted> = new MatTableDataSource()
  public accountSubscription: Subscription

  @ViewChild(MatSort, { static: false })
  private set content(sort: MatSort) {
    // Needed because of the ngif wrapper around the table
    if (this.dataSource) {
      this.dataSource.sort = sort
    }
  }

  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator

  public ngOnInit(): void {
    this.getAccounts()

    this.dataSource.paginator = this.paginator

    this.activatedRoute.params.subscribe((params): void => {
      if (params["id"]) {
        this.accountDialog(params["id"])
      }
    })
  }

  public getAccounts(): void {
    this.accountSubscription = this.accountsService.accountsGet().subscribe(
      (accounts: AccountListItem[]): void => {
        const accountsFormatted = accounts as AccountListItemFormatted[]

        // Convert quota bytes to human readable
        for (const accountFormatted of accountsFormatted) {
          accountFormatted.quotaAllowedFormatted = this.formatBytes(accountFormatted.quota.allowed)
          accountFormatted.quotaUsedFormatted = this.formatBytes(accountFormatted.quota.used)
        }

        this.dataSource.data = accountsFormatted
        this.dataSource.sortingDataAccessor = (item, property): string | number => {
          // Sort the number of bytes instead of the formatted string
          switch (property) {
            case "quotaUsedFormatted":
              return item.quota.used
            case "quotaAllowedFormatted":
              return item.quota.allowed
            default:
              return item[property]
          }
        }
      },
      (error: HttpErrorResponse): void => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  public formatBytes(bytes, decimals = 1): string {
    if (bytes == 0) return "0 Bytes"
    const k = 1024,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  }

  public accountDialog(id?: string): void {
    const dialogConfig: MatDialogConfig = {}
    if (id) {
      dialogConfig.data = { id: id }
    }
    const dialog = this.dialog.open(AccountDialogComponent, dialogConfig)
    dialog.afterClosed().subscribe((result): void => {
      this.router.navigateByUrl("/accounts/")
      if (result) {
        this.getAccounts()
      }
    })
  }

  public removeConfirmDialog(accountId: string, address?: string): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: `Remove ${address || accountId}`,
        text: "Are you sure? This will delete all messages in this account.",
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

              this.accountsService.accountsAccountIdDelete(accountId).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${address || accountId} has been removed`, undefined, {
                    panelClass: "success-snackbar"
                  })
                  this.getAccounts()
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
