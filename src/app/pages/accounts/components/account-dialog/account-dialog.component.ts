import { Component, OnInit, Inject } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material"

@Component({
  selector: "app-account-dialog",
  templateUrl: "./account-dialog.component.html",
  styleUrls: ["./account-dialog.component.scss"]
})
export class AccountDialogComponent implements OnInit {
  public isModifyDialog: boolean
  public addressName: string
  public domains: string[]
  public accountDetails: AccountDetails
  public constructor(public dialogRef: MatDialogRef<AccountDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

  public ngOnInit(): void {
    // If id was passed this is a modify dialog, otherwise it is a create dialog
    if (this.data) {
      this.isModifyDialog = true
      // Get account details from api
      this.accountDetails = {
        id: this.data.id,
        name: "John Doe 1",
        address: "john1@domain1.com",
        spamLevel: 50,
        quota: {
          allowed: 1000000,
          used: 10000
        },
        disabledScopes: ["imap", "pop3"],
        disabled: false
      }
      // Split address to name and domain for split input
      this.addressName = this.accountDetails.address.substring(0, this.accountDetails.address.lastIndexOf("@"))
      this.domains = [this.accountDetails.address.substring(this.accountDetails.address.lastIndexOf("@") + 1)]
    } else {
      // Get domains for this user from api
      this.domains = [
        "domain1.com",
        "domain2.com",
        "domain3.com",
        "domain4.com",
        "domain5.com",
        "domain6.com",
        "domain7.com",
        "domain8.com"
      ]
    }
  }

  public updateAccount(): void {
    alert("function to execute when saved")
    this.dialogRef.close()
  }
}
