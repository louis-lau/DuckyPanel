import { HttpErrorResponse } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar'
import { Router } from '@angular/router'

import { DialogComponent } from '../dialog/dialog.component'
import { DialogConfig } from '../dialog/dialog.interfaces'

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss'],
})
export class ErrorSnackbarComponent implements OnInit {
  public constructor(
    public snackBarRef: MatSnackBarRef<ErrorSnackbarComponent>,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_SNACK_BAR_DATA) public data,
  ) {}

  public message: string
  public errorDetails: string

  public ngOnInit(): void {
    if (this.data instanceof HttpErrorResponse) {
      if (this.data.error.error === 'UnauthorizedError') {
        this.message = 'Session expired, please login.'
        this.router.navigateByUrl('/login')
      } else if (this.data.error.error === 'ValidationError') {
        this.message = 'Invalid input'
        this.errorDetails = JSON.stringify(this.data.error.message)
      } else if (this.data.error.message) {
        this.message = this.data.error.message
      } else {
        this.message = 'Unknown error. 🤷‍'
        this.errorDetails = JSON.stringify(this.data.message)
      }
    } else {
      this.message = this.data
    }
  }

  public showDetails(): void {
    const dialogConfig: DialogConfig = {
      data: {
        title: 'Error details',
        text: this.errorDetails,
        buttons: [
          {
            options: {
              active: false,
              text: 'OK',
            },
          },
        ],
      },
    }
    this.dialog.open(DialogComponent, dialogConfig)
  }
}
