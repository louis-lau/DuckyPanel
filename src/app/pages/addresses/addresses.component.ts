import { Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource, MatSort, MatDialog } from "@angular/material"
import { AddressDialogComponent } from "./components/address-dialog/address-dialog.component"

interface AddressData {
  id: string
  name: string
  address: string
  quotaAllowed: number | string
  quotaUsed: number | string
  disabled: boolean
}

@Component({
  selector: "app-addresses",
  templateUrl: "./addresses.component.html",
  styleUrls: ["./addresses.component.scss"]
})
export class AddressesComponent implements OnInit {
  public displayedColumns = ["name", "address", "quotaUsed", "quotaAllowed", "actions"]
  public dataSource: MatTableDataSource<AddressData>
  @ViewChild(MatSort, { static: true }) public sort: MatSort

  public constructor(public dialog: MatDialog) {}

  public ngOnInit(): void {
    // Create 100 addresses
    var addresses: AddressData[] = []
    for (let i = 1; i <= 25; i++) {
      /*users.push(createNewUser(i));*/

      let randomAllowed = Math.floor(Math.random() * Math.floor(10)) * 1073741824
      let randomUsed = Math.floor(Math.random() * Math.floor(randomAllowed))

      let user: AddressData = {
        id: `59cb948ad80a820b68f0523${i}`,
        name: `John Doe ${i}`,
        address: `john${i}@domain.com`,
        quotaAllowed: randomAllowed,
        quotaUsed: randomUsed,
        disabled: false
      }
      addresses.push(user)
    }

    // Convert quota bytes to human readable
    for (const address of addresses) {
      address.quotaAllowed = this.formatBytes(address.quotaAllowed)
      address.quotaUsed = this.formatBytes(address.quotaUsed)
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(addresses)
    console.log(this.dataSource)
    this.dataSource.sort = this.sort
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
