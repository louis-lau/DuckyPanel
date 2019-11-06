import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { HttpErrorResponse } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { MatSnackBar, MatTableDataSource } from "@angular/material"
import { DnsCheck, DnsCheckError, DnsCheckMxRecord, DomainsService } from "ducky-api-client-angular"
import { Observable, Subscription } from "rxjs"
import { map } from "rxjs/operators"
import { ErrorSnackbarComponent } from "src/app/shared/components/error-snackbar/error-snackbar.component"

import { DnsCheckTxtRecord } from "./dns.interfaces"

@Component({
  selector: "app-dns",
  templateUrl: "./dns.component.html",
  styleUrls: ["./dns.component.scss"]
})
export class DnsComponent implements OnInit {
  public constructor(
    private breakpointObserver: BreakpointObserver,
    private domainsService: DomainsService,
    private snackBar: MatSnackBar
  ) {}

  public domains: string[]
  public selectedDomain: string
  public domainsSubscription: Subscription
  public dnsCheck: DnsCheck
  public dnsCheckSubscription: Subscription
  public correctMxDataSource: MatTableDataSource<DnsCheckMxRecord> = new MatTableDataSource()
  public correctMxDisplayedColumns = ["name", "server", "priority"]
  public correctTxtDataSource: MatTableDataSource<DnsCheckTxtRecord> = new MatTableDataSource()
  public correctTxtDisplayedColumns = ["name", "content"]
  public errorDataSource: MatTableDataSource<DnsCheckError> = new MatTableDataSource()
  public errorDisplayedColumns = ["type", "message"]

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

  public domainForm: FormGroup = new FormGroup({
    domain: new FormControl(null)
  })

  public ngOnInit(): void {
    this.getDomains()

    this.domainForm.controls["domain"].valueChanges.subscribe((value): void => {
      this.selectedDomain = value
      this.checkDNS(value)
    })
  }

  public getDomains(): void {
    this.domainsSubscription = this.domainsService.domainsGet().subscribe(
      (domains): void => {
        this.domains = domains.map((value): string => value.domain)
      },
      (error: HttpErrorResponse): void => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }

  public checkDNS(domain: string): void {
    this.dnsCheckSubscription = this.domainsService.domainsDomainDNSGet(domain).subscribe(
      (dnsCheck): void => {
        this.dnsCheck = dnsCheck
        this.errorDataSource.data = dnsCheck.errors
        this.correctMxDataSource.data = dnsCheck.correctValues.mx
        this.correctTxtDataSource.data = []
        this.correctTxtDataSource.data.push({
          content: dnsCheck.correctValues.spf
        })
        if (dnsCheck.correctValues.dkim) {
          this.correctTxtDataSource.data.push({
            content: dnsCheck.correctValues.dkim.value,
            isDkim: true
          })
        }
      },
      (error: HttpErrorResponse): void => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
      }
    )
  }
}
