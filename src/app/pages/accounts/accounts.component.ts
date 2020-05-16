import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { EmailAccountsService } from 'ducky-api-client-angular'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { DialogConfig } from 'src/app/shared/components/dialog/dialog.interfaces'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

import { AccountListItemFormatted } from './accounts.interfaces'
import { AccountsService } from './accounts.service'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  public constructor(
    public dialog: MatDialog,
    private readonly apiAccountsService: EmailAccountsService,
    public accountsService: AccountsService,
    private snackBar: MatSnackBar,
    private errorSnackbarService: ErrorSnackbarService,
  ) {}

  public displayedColumns = ['address', 'name', 'quotaUsedFormatted', 'quotaAllowedFormatted', 'actions']
  public dataSource: MatTableDataSource<AccountListItemFormatted> = new MatTableDataSource()

  @ViewChild(MatSort)
  private set content(sort: MatSort) {
    // Needed because of the ngif wrapper around the table
    if (this.dataSource) {
      this.dataSource.sort = sort
    }
  }

  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource()
    this.dataSource.sortingDataAccessor = (item, property): string | number => {
      // Sort the number of bytes instead of the formatted string
      switch (property) {
        case 'quotaUsedFormatted':
          return item.quota.used
        case 'quotaAllowedFormatted':
          return item.quota.allowed
        default:
          return item[property]
      }
    }
    this.dataSource.paginator = this.paginator

    this.accountsService.accountSubscription.add(() => {
      this.dataSource.data = this.accountsService.accountsFormatted

      this.accountsService.accountsFormattedSubject.subscribe((accountsFormatted) => {
        this.dataSource.data = accountsFormatted
      })
    })
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  public removeConfirmDialog(accountId: string, address?: string): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: `Remove ${address || accountId}`,
        text: 'Are you sure? This will delete all messages in this account.',
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

              this.apiAccountsService.deleteAccount(accountId).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${address || accountId} has been removed`, undefined, {
                    panelClass: 'success-snackbar',
                  })
                  this.accountsService.getAccounts()
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
