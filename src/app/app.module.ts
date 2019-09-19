import { LayoutModule } from "@angular/cdk/layout"
import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material"
import { MatChipsModule } from "@angular/material/chips"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ApiModule, Configuration, ConfigurationParameters } from "ducky-api-client-angular"
import { MatProgressButtonsModule } from "mat-progress-buttons"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { DialogComponent } from "./components/dialog/dialog.component"
import { ErrorSnackbarComponent } from "./components/error-snackbar/error-snackbar.component"
import { FabButtonComponent } from "./components/fab-button/fab-button.component"
import { AccountsComponent } from "./pages/accounts/accounts.component"
import { AccountDialogComponent } from "./pages/accounts/components/account-dialog/account-dialog.component"
import { AddDomainDialogComponent } from "./pages/domains/components/add-domain-dialog/add-domain-dialog.component"
import { DomainsComponent } from "./pages/domains/domains.component"
import { ForwarderDialogComponent } from "./pages/forwarders/components/forwarder-dialog/forwarder-dialog.component"
import { ForwardersComponent } from "./pages/forwarders/forwarders.component"
import { LoginComponent } from "./pages/login/login.component"

// TODO: take these values from a config file or envvar
export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: "http://localhost:3000"
  }
  return new Configuration(params)
}
@NgModule({
  entryComponents: [
    DialogComponent,
    AccountDialogComponent,
    AddDomainDialogComponent,
    ErrorSnackbarComponent,
    ForwarderDialogComponent
  ],
  declarations: [
    AppComponent,
    DomainsComponent,
    DialogComponent,
    AccountsComponent,
    FabButtonComponent,
    AccountDialogComponent,
    AddDomainDialogComponent,
    LoginComponent,
    ErrorSnackbarComponent,
    ForwardersComponent,
    ForwarderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatInputModule,
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ApiModule.forRoot(apiConfigFactory),
    MatProgressButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }],
  bootstrap: [AppComponent]
})
export class AppModule {}
