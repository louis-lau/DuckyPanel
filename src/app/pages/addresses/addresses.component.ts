import { Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource, MatSort, MatDialog } from "@angular/material"
import { AddressDialogComponent } from "./components/address-dialog/address-dialog.component"
import { AddressesService } from "./addresses.service"
import { Addresses } from "./addresses.interfaces"
import { Subscription } from "rxjs"
import { HttpErrorResponse } from "@angular/common/http"

@Component({
  selector: "app-addresses",
  templateUrl: "./addresses.component.html",
  styleUrls: ["./addresses.component.scss"]
})
export class AddressesComponent implements OnInit {
  private displayedColumns = ["name", "address", "quotaUsed", "quotaAllowed", "actions"]
  private dataSource: MatTableDataSource<Addresses>
  private addressSubscription: Subscription

  @ViewChild(MatSort, { static: true })
  private sort: MatSort

  public constructor(public dialog: MatDialog, private addressesService: AddressesService) {}

  public ngOnInit(): void {
    this.getAddresses()
  }

  public getAddresses(): void {
    this.addressSubscription = this.addressesService.getAddresses().subscribe(
      (addresses: Addresses[]): void => {
        // Convert quota bytes to human readable
        for (const address of addresses) {
          address.quotaAllowed = this.formatBytes(address.quotaAllowed)
          address.quotaUsed = this.formatBytes(address.quotaUsed)
        }

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(addresses)
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

  public addressDialog(id?: string): void {
    let dialogConfig = {}
    if (id) {
      dialogConfig = { data: { id: id } }
    }
    this.dialog.open(AddressDialogComponent, dialogConfig)
  }
}
