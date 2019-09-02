import { Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource, MatSort, MatDialog } from "@angular/material"
import { AccountDialogComponent } from "./components/account-dialog/account-dialog.component"
import { AccountsService } from "./accounts.service"
import { Accounts } from "./accounts.interfaces"
import { Subscription } from "rxjs"
import { HttpErrorResponse } from "@angular/common/http"

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit {
  private displayedColumns = ["name", "address", "quotaUsed", "quotaAllowed", "actions"]
  private dataSource: MatTableDataSource<Accounts>
  public accountSubscription: Subscription

  @ViewChild(MatSort, { static: true })
  private sort: MatSort

  public constructor(public dialog: MatDialog, private accountsService: AccountsService) {}

  public ngOnInit(): void {
    this.getAccounts()
  }

  public getAccounts(): void {
    this.accountSubscription = this.accountsService.getAccounts().subscribe(
      (accounts: Accounts[]): void => {
        // Convert quota bytes to human readable
        for (const account of accounts) {
          account.quotaAllowed = this.formatBytes(account.quotaAllowed)
          account.quotaUsed = this.formatBytes(account.quotaUsed)
        }

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(accounts)
        this.dataSource.sort = this.sort
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
