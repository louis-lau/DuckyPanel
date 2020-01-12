import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { MatSnackBar } from "@angular/material"
import { Router } from "@angular/router"
import { AccessToken, AuthenticationService } from "ducky-api-client-angular"
import { MatProgressButtonOptions } from "mat-progress-buttons"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { ErrorSnackbarComponent } from "src/app/shared/components/error-snackbar/error-snackbar.component"

import { ProfileService } from "../profile/profile.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result): boolean => result.matches))

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  public loginButtonConfig: MatProgressButtonOptions = {
    active: false,
    text: "LOGIN",
    disabled: true,
    raised: true,
    buttonColor: "primary",
    spinnerColor: "accent",
    spinnerSize: 18,
    mode: "indeterminate"
  }

  public ngOnInit(): void {
    this.loginForm.valueChanges.subscribe((): void => {
      this.loginButtonConfig.disabled = this.loginForm.invalid
    })
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loginButtonConfig.active = true
      this.authenticationService
        .getAccessToken({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password
        })
        .subscribe(
          (accessToken: AccessToken): void => {
            localStorage.setItem("access_token", accessToken.accessToken)
            this.authenticationService.configuration.accessToken = accessToken.accessToken

            this.profileService.username = this.loginForm.value.username

            this.router.navigateByUrl("/accounts")
          },
          (error): void => {
            this.loginButtonConfig.active = false
            if (error.error.error === "Unauthorized") {
              this.snackBar.openFromComponent(ErrorSnackbarComponent, {
                data: "Invalid username or password",
                panelClass: ["error-snackbar"]
              })
            } else {
              this.snackBar.openFromComponent(ErrorSnackbarComponent, { data: error, panelClass: ["error-snackbar"] })
            }
          }
        )
    }
  }
}
