import { Injectable } from '@angular/core'
import { UsersService } from 'ducky-api-client-angular'
import { Subscription } from 'rxjs'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public constructor(private usersService: UsersService, private errorSnackbarService: ErrorSnackbarService) {}

  public username: string
  public userInfoSubscription: Subscription

  public getUserInfo(): void {
    this.userInfoSubscription = this.usersService.getMe().subscribe(
      (user): void => {
        this.username = user.username
      },
      error => {
        this.errorSnackbarService.open(error)
      },
    )
  }
}
