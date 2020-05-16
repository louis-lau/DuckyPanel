import { Injectable } from '@angular/core'
import { ProfileService as ApiProfileService, User } from 'ducky-api-client-angular'
import { Subscription } from 'rxjs'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public constructor(
    private apiProfileService: ApiProfileService,
    private errorSnackbarService: ErrorSnackbarService,
  ) {}

  public user: User = {} as User
  public userInfoSubscription: Subscription

  public getUserInfo(): void {
    this.userInfoSubscription = this.apiProfileService.getMe().subscribe(
      (user): void => {
        this.user = user
      },
      (error) => {
        this.errorSnackbarService.open(error)
      },
    )
  }
}
