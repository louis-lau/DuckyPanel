import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { Forwarder, ForwardersService } from 'ducky-api-client-angular'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { DialogConfig } from 'src/app/shared/components/dialog/dialog.interfaces'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

import { ForwarderDialogComponent } from './components/forwarder-dialog/forwarder-dialog.component'

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
    private readonly forwardersService: ForwardersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  public displayedColumns = ['address', 'actions']
  public dataSource: MatTableDataSource<Forwarder> = new MatTableDataSource()
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

  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator

  public ngOnInit(): void {
    this.getForwarders()

    this.dataSource.paginator = this.paginator

    this.activatedRoute.params.subscribe((params): void => {
      if (params['id']) {
        this.forwarderDialog(params['id'])
      }
    })
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  public getForwarders(): void {
    this.forwarderSubscription = this.forwardersService.getForwarders().subscribe(
      (forwarders): void => {
        this.dataSource.data = forwarders
      },
      error => {
        this.errorSnackbarService.open(error)
      },
    )
  }

  public forwarderDialog(id?: string): void {
    const dialogConfig: MatDialogConfig = {}
    if (id) {
      dialogConfig.data = { id: id }
    }
    const dialog = this.dialog.open(ForwarderDialogComponent, dialogConfig)
    dialog.afterClosed().subscribe((result): void => {
      this.router.navigateByUrl('/forwarders/')
      if (result) {
        this.getForwarders()
      }
    })
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

              this.forwardersService.deleteForwarder(forwarderId).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${address || forwarderId} has been removed`, undefined, {
                    panelClass: 'success-snackbar',
                  })
                  this.getForwarders()
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
