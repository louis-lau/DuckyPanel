import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material'
import { Router } from '@angular/router'
import { Domain, DomainsService as ApiDomainsService } from 'ducky-api-client-angular'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { DialogConfig } from 'src/app/shared/components/dialog/dialog.interfaces'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

import { AddAliasDialogComponent } from './components/add-alias-dialog/add-alias-dialog.component'
import { AddDomainDialogComponent } from './components/add-domain-dialog/add-domain-dialog.component'
import { DkimDialogComponent } from './components/dkim-dialog/dkim-dialog.component'
import { DomainsService } from './domains.service'

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss'],
})
export class DomainsComponent implements OnInit {
  public constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private errorSnackbarService: ErrorSnackbarService,
    private readonly apiDomainsService: ApiDomainsService,
    public domainsService: DomainsService,
    private router: Router,
  ) {}

  public displayedColumns = ['domain', 'actions']
  public dataSource: MatTableDataSource<Domain>
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

  public ngOnInit(): void {
    this.domainsService.domainsSubscription.add(() => {
      this.dataSource = new MatTableDataSource(this.domainsService.domainsAndAliases)
    })
  }

  public refreshDomains(): void {
    this.domainsService.getDomains().add(() => {
      this.dataSource = new MatTableDataSource(this.domainsService.domainsAndAliases)
    })
  }

  public addDomainDialog(): void {
    const dialog = this.dialog.open(AddDomainDialogComponent)
    dialog.afterClosed().subscribe((result): void => {
      if (result) {
        this.refreshDomains()
      }
    })
  }

  public addAliasDialog(): void {
    const dialog = this.dialog.open(AddAliasDialogComponent)
    dialog.afterClosed().subscribe((result): void => {
      if (result) {
        this.refreshDomains()
      }
    })
  }

  public dkimDialog(domain: string, edit = false): void {
    const dialog = this.dialog.open(DkimDialogComponent, {
      data: {
        domain: domain,
        edit: edit,
      },
    })
    dialog.afterClosed().subscribe((result): void => {
      this.router.navigateByUrl('/domains')
      if (result) {
        this.refreshDomains()
      }
    })
  }

  public removeDomainConfirmDialog(domain: string): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: `Remove ${domain}`,
        text: 'Are you sure? This will also remove accounts associated with this domain.',
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

              this.apiDomainsService.deleteDomain(domain).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${domain} has been removed`, undefined, { panelClass: 'success-snackbar' })
                  this.refreshDomains()
                },
                (error: HttpErrorResponse): void => {
                  dialogRef.close()
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

  public removeAliasConfirmDialog(domain: string, alias: string): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: `Remove ${alias}`,
        text: 'Are you sure? Any account data will remain as this is just an alias.',
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

              this.apiDomainsService.deleteAlias(domain, alias).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${alias} has been removed`, undefined, { panelClass: 'success-snackbar' })
                  this.refreshDomains()
                },
                (error: HttpErrorResponse): void => {
                  dialogRef.close()
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
