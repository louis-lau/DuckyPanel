import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { ProfileService as ApiProfileService, User } from 'duckyapi-angular'
import { Subscription } from 'rxjs'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { DialogConfig } from 'src/app/shared/components/dialog/dialog.interfaces'
import { ErrorSnackbarService } from 'src/app/shared/components/error-snackbar/error-snackbar.service'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public constructor(
    private apiProfileService: ApiProfileService,
    private errorSnackbarService: ErrorSnackbarService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  public user: User = {} as User
  public userInfoSubscription: Subscription

  public getUserInfo(): void {
    this.userInfoSubscription = this.apiProfileService.getMe().subscribe(
      (user): void => {
        this.user = user
        if (!user.roles.includes('user')) {
          this.logout()
          const dialogConfig: DialogConfig = {
            data: {
              title: 'Invalid user role',
              text:
                'An admin user should only be used for user management via the API. Try logging in as a normal user.',
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
      },
      (error) => {
        this.errorSnackbarService.open(error)
      },
    )
  }

  public logout(): void {
    localStorage.removeItem('access_token')
    delete this.apiProfileService.configuration.accessToken
    this.snackBar.open('Logged out successfully', undefined, {
      panelClass: 'success-snackbar',
    })
    this.router.navigateByUrl('/login')
  }
}
