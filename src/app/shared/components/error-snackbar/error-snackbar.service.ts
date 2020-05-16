import { Injectable, NgZone } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

import { ErrorSnackbarComponent } from './error-snackbar.component'

@Injectable({
  providedIn: 'root',
})
export class ErrorSnackbarService {
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  public open(error): void {
    this.zone.run(() => {
      this.snackBar.openFromComponent(ErrorSnackbarComponent, {
        data: error,
        panelClass: ['error-snackbar'],
      })
    })
  }
}
