import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material"
import { UsersService } from "ducky-api-client-angular"
import { ErrorSnackbarComponent } from "src/app/shared/components/error-snackbar/error-snackbar.component"

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  public constructor(private usersService: UsersService, private snackBar: MatSnackBar) {}

  public username: string

  public getUserInfo(): void {
    this.usersService.getMe().subscribe(
      (user): void => {
        this.username = user.username
      },
      (error): void => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: error,
          panelClass: ["error-snackbar"]
        })
      }
    )
  }
}
