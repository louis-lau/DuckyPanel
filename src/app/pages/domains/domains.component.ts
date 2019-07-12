import { Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from "@angular/material"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { ConfirmDialogComponent, ConfirmDialogConfig } from "src/app/components/confirm-dialog/confirm-dialog.component"

interface DomainData {
  domain: string
}

@Component({
  selector: "app-domains",
  templateUrl: "./domains.component.html",
  styleUrls: ["./domains.component.scss"]
})
export class DomainsComponent implements OnInit {
  public displayedColumns = ["domain", "actions"]
  public dataSource: MatTableDataSource<DomainData>
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) public sort: MatSort
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  public constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    // Create 100 domains
    var domains = []
    for (let i = 1; i <= 100; i++) {
      /*users.push(createNewUser(i));*/

      domains.push({ domain: `domain${i}.com` })
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(domains)
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  public removeConfirm(domain: string): void {
    let dialogConfig: ConfirmDialogConfig = {
      data: {
        title: `Remove ${domain}`,
        text: "Are you sure? This will also remove accounts associated with this domain.",
        buttons: [
          {
            text: "No",
            color: "primary"
          },
          {
            text: "Yes",
            color: "warn",
            result: true
          }
        ]
      }
    }
    let dialog = this.dialog.open(ConfirmDialogComponent, dialogConfig)
    dialog.afterClosed().subscribe((result): void => {
      if (result) {
        this.snackBar.open(`${domain} has been removed`, undefined, { duration: 3000 })
      }
    })
  }
}
