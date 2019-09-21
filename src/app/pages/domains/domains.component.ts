import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { HttpErrorResponse } from "@angular/common/http"
import { Component, OnInit, ViewChild } from "@angular/core"
import { MatDialog, MatDialogRef, MatSnackBar, MatSort, MatTableDataSource } from "@angular/material"
import { Domain, DomainsService } from "ducky-api-client-angular"
import { Observable, Subscription } from "rxjs"
import { map } from "rxjs/operators"
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component"
import { DialogConfig } from "src/app/shared/components/dialog/dialog.interfaces"
import { ErrorSnackbarComponent } from "src/app/shared/components/error-snackbar/error-snackbar.component"

import { AddDomainDialogComponent } from "./components/add-domain-dialog/add-domain-dialog.component"

@Component({
  selector: "app-domains",
  templateUrl: "./domains.component.html",
  styleUrls: ["./domains.component.scss"]
})
export class DomainsComponent implements OnInit {
  public constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private readonly domainsService: DomainsService
  ) {}

  public displayedColumns = ["domain", "actions"]
  public dataSource: MatTableDataSource<Domain>
  public domainSubscription: Subscription
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
    this.getDomains()
  }

  public getDomains(): void {
    const accessToken = localStorage.getItem("access_token")
    this.domainsService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
    this.domainSubscription = this.domainsService.domainsGet().subscribe(
      (domains: Domain[]): void => {
        this.dataSource = new MatTableDataSource(domains)
      },
      (error: HttpErrorResponse): void => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }

  public addDialog(): void {
    const dialog = this.dialog.open(AddDomainDialogComponent)
    dialog.afterClosed().subscribe((result): void => {
      if (result) {
        this.getDomains()
      }
    })
  }

  public removeConfirmDialog(domain: string): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: `Remove ${domain}`,
        text: "Are you sure? This will also remove accounts associated with this domain.",
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
              this.domainsService.configuration.apiKeys = { Authorization: `bearer ${accessToken}` }
              this.domainsService.domainsDomainDelete(domain).subscribe(
                (): void => {
                  dialogRef.close()
                  this.snackBar.open(`${domain} has been removed`)
                  this.getDomains()
                },
                (error: HttpErrorResponse): void => {
                  dialogRef.close()
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
