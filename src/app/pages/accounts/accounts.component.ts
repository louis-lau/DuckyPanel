import { Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource, MatSort, MatDialog } from "@angular/material"
import { AccountDialogComponent } from "./components/account-dialog/account-dialog.component"
import { Subscription } from "rxjs"
import { HttpErrorResponse } from "@angular/common/http"
import { EmailAccountsService, AccountListItem } from "ducky-api-client-angular"
import { AccountListItemFormatted } from "./accounts.interfaces"

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit {
  private displayedColumns = ["name", "address", "quotaUsedFormatted", "quotaAllowedFormatted", "actions"]
  private dataSource: MatTableDataSource<AccountListItemFormatted>
  public accountSubscription: Subscription

  @ViewChild(MatSort, { static: false })
  private set content(sort: MatSort) {
    // Needed because of the ngif wrapper around the table
    if (this.dataSource) {
      this.dataSource.sort = sort
    }
  }

  public constructor(public dialog: MatDialog, private readonly accountsService: EmailAccountsService) {}

  public ngOnInit(): void {
    this.getAccounts()
  }

  public getAccounts(): void {
    this.accountSubscription = this.accountsService.accountsGet().subscribe(
      (accounts: AccountListItem[]): void => {
        let accountsFormatted = accounts as AccountListItemFormatted[]

        // Convert quota bytes to human readable
        for (const accountFormatted of accountsFormatted) {
          accountFormatted.quotaAllowedFormatted = this.formatBytes(accountFormatted.quota.allowed)
          accountFormatted.quotaUsedFormatted = this.formatBytes(accountFormatted.quota.used)
        }

        this.dataSource = new MatTableDataSource(accountsFormatted)
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
        alert(error.message)
      }
    )
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  public formatBytes(bytes, decimals?): string {
    if (bytes == 0) return "0 Bytes"
    var k = 1024,
      dm = decimals || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  public accountDialog(id?: string): void {
    let dialogConfig = {}
    if (id) {
      dialogConfig = { data: { id: id } }
    }
    this.dialog.open(AccountDialogComponent, dialogConfig)
  }
}
