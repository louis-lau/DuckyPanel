import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Forwarder, ForwardersService as ApiForwardersService } from 'ducky-api-client-angular'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { DialogConfig } from 'src/app/shared/components/dialog/dialog.interfaces'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

import { ForwardersService } from './forwarders.service'

@Component({
  selector: 'app-forwarders',
  templateUrl: './forwarders.component.html',
  styleUrls: ['./forwarders.component.scss'],
})
export class ForwardersComponent implements OnInit {
  public constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private errorSnackbarService: ErrorSnackbarService,
    private readonly apiForwardersService: ApiForwardersService,
    public forwardersService: ForwardersService,
  ) {}

  public displayedColumns = ['address', 'actions']
  public dataSource: MatTableDataSource<Forwarder> = new MatTableDataSource()
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

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
    this.dataSource.paginator = this.paginator

    this.forwardersService.forwarderSubscription.add(() => {
      this.dataSource.data = this.forwardersService.forwarders

      this.forwardersService.forwardersSubject.subscribe((forwarders) => {
        this.dataSource.data = forwarders
      })
    })
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  public removeConfirmDialog(forwarderId: string, address?: string): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: `Remove ${address || forwarderId}`,
        text: 'Are you sure?',
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

              this.apiForwardersService.deleteForwarder(forwarderId).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${address || forwarderId} has been removed`, undefined, {
                    panelClass: 'success-snackbar',
                  })
                  this.forwardersService.getForwarders()
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
