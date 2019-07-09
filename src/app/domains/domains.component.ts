import { Component, OnInit, ViewChild, Inject } from "@angular/core"
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Component({
  selector: "remove-confirm-dialog",
  templateUrl: "remove-confirm-dialog.html"
})
export class RemoveConfirmDialog {
  public constructor(public dialogRef: MatDialogRef<RemoveConfirmDialog>, @Inject(MAT_DIALOG_DATA) public data) {}

  public onNoClick(): void {
    this.dialogRef.close()
  }
}

@Component({
  selector: "app-domains",
  templateUrl: "./domains.component.html",
  styleUrls: ["./domains.component.scss"]
})
export class DomainsComponent implements OnInit {
  public displayedColumns = ["domain", "actions"]
  public dataSource: MatTableDataSource<UserData>
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) public sort: MatSort
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches))

  public constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    // Create 100 domains
    var domains = []
    for (let i = 1; i <= 100; i++) {
      /*users.push(createNewUser(i));*/

      domains.push({ domain: `domain${i}.com`, actions: "remove" })
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(domains)
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  public ngOnInit(): void {}

  public removeConfirm(domain: string): void {
    this.dialog.open(RemoveConfirmDialog, { data: { domain: domain } })
  }
}

interface UserData {
  domain: string
}
