import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Location } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { Domain, DomainAlias, DomainsService } from 'ducky-api-client-angular'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { DialogConfig } from 'src/app/shared/components/dialog/dialog.interfaces'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

import { AddAliasDialogComponent } from './components/add-alias-dialog/add-alias-dialog.component'
import { AddDomainDialogComponent } from './components/add-domain-dialog/add-domain-dialog.component'
import { DkimDialogComponent } from './components/dkim-dialog/dkim-dialog.component'

interface AliasWithParentInfo extends DomainAlias {
  aliasOf?: string
}
interface DomainWithAliasParentInfo extends Domain {
  aliases?: AliasWithParentInfo[]
}

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
    private readonly domainsService: DomainsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  public displayedColumns = ['domain', 'actions']
  public dataSource: MatTableDataSource<Domain>
  public domainSubscription: Subscription
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params): void => {
      if (params.refresh) {
        this.getDomains()

        // Remove refresh param from url
        const newParams = { ...params }
        delete newParams.refresh
        this.router.navigate(['.'], {
          relativeTo: this.route,
          queryParams: newParams,
          replaceUrl: true,
        })
      }
    })

    this.getDomains()
  }

  public getDomains(): void {
    this.domainSubscription = this.domainsService.getDomains().subscribe(
      (domains: Domain[]): void => {
        // Assert domains as a different type so we can add "aliasOf"
        const assertedDomains = domains as DomainWithAliasParentInfo[]
        const domainsAndAliases: DomainWithAliasParentInfo[] = []

        for (const domain of assertedDomains) {
          domainsAndAliases.push(domain)
          if (domain.aliases && domain.aliases.length > 0) {
            for (const alias of domain.aliases) {
              alias.aliasOf = domain.domain
              domainsAndAliases.push(alias)
            }
          }
        }

        this.dataSource = new MatTableDataSource(domainsAndAliases)
      },
      error => {
        this.errorSnackbarService.open(error)
      },
    )
  }

  public addDomainDialog(): void {
    const dialog = this.dialog.open(AddDomainDialogComponent)
    dialog.afterClosed().subscribe((result): void => {
      if (result) {
        this.getDomains()
      }
    })
  }

  public addAliasDialog(): void {
    const dialog = this.dialog.open(AddAliasDialogComponent)
    dialog.afterClosed().subscribe((result): void => {
      if (result) {
        this.getDomains()
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
        this.getDomains()
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

              this.domainsService.deleteDomain(domain).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${domain} has been removed`, undefined, { panelClass: 'success-snackbar' })
                  this.getDomains()
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

              this.domainsService.deleteAlias(domain, alias).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${alias} has been removed`, undefined, { panelClass: 'success-snackbar' })
                  this.getDomains()
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
