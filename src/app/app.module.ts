import { LayoutModule } from '@angular/cdk/layout'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatOptionModule } from '@angular/material/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial'
import { ApiModule, Configuration, ConfigurationParameters } from 'duckyapi-angular'
import { MatProgressButtonsModule } from 'mat-progress-buttons'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AccountsComponent } from './pages/accounts/accounts.component'
import {
  AccountDialogComponent,
  AccountDialogEntryComponent,
} from './pages/accounts/components/account-dialog/account-dialog.component'
import { DnsComponent } from './pages/dns/dns.component'
import { AddAliasDialogComponent } from './pages/domains/components/add-alias-dialog/add-alias-dialog.component'
import { AddDomainDialogComponent } from './pages/domains/components/add-domain-dialog/add-domain-dialog.component'
import {
  DkimDialogComponent,
  DkimDialogEntryComponent,
} from './pages/domains/components/dkim-dialog/dkim-dialog.component'
import { DomainsComponent } from './pages/domains/domains.component'
import {
  ForwarderDialogComponent,
  ForwarderDialogEntryComponent,
} from './pages/forwarders/components/forwarder-dialog/forwarder-dialog.component'
import { ForwardersComponent } from './pages/forwarders/forwarders.component'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { DialogComponent } from './shared/components/dialog/dialog.component'
import { ErrorSnackbarComponent } from './shared/components/error-snackbar/error-snackbar.component'
import { FabButtonComponent } from './shared/components/fab-button/fab-button.component'
import { TdLoadingMaskComponent } from './shared/components/loading-mask/loading-mask.component'

// TODO: take these values from a config file or envvar
export function apiConfigFactory(): Configuration {
  const accessToken = localStorage.getItem('access_token')
  const params: ConfigurationParameters = {
    basePath: 'http://localhost:3000',
    accessToken: accessToken,
  }
  return new Configuration(params)
}
@NgModule({
  entryComponents: [
    DialogComponent,
    AccountDialogComponent,
    AddDomainDialogComponent,
    AddAliasDialogComponent,
    ErrorSnackbarComponent,
    ForwarderDialogComponent,
    DkimDialogComponent,
  ],
  declarations: [
    AppComponent,
    DomainsComponent,
    DialogComponent,
    AccountsComponent,
    FabButtonComponent,
    AccountDialogComponent,
    AccountDialogEntryComponent,
    AddDomainDialogComponent,
    AddAliasDialogComponent,
    LoginComponent,
    ErrorSnackbarComponent,
    ForwardersComponent,
    ForwarderDialogComponent,
    ForwarderDialogEntryComponent,
    DkimDialogComponent,
    DkimDialogEntryComponent,
    DnsComponent,
    ProfileComponent,
    TdLoadingMaskComponent,
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
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    EcoFabSpeedDialModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 5000 },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
