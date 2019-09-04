import { LayoutModule } from "@angular/cdk/layout"
import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"
import {
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
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ApiModule, Configuration, ConfigurationParameters } from "ducky-api-client-angular"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component"
import { FabButtonComponent } from "./components/fab-button/fab-button.component"
import { AccountsComponent } from "./pages/accounts/accounts.component"
import { AccountDialogComponent } from "./pages/accounts/components/account-dialog/account-dialog.component"
import { DomainsComponent } from "./pages/domains/domains.component"

// TODO: take these values from a config file or envvar
export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: "http://localhost:3000",
    apiKeys: {
      Authorization:
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDRkZTYwMTllZGI5YjM1NTA0ZDYxZDgiLCJpYXQiOjE1Njc1MTI2NTYsImV4cCI6MTU2ODExNzQ1Nn0.XWmpIkEaTW1KX4-tiXpSN1C39y5oia4mi1guc1UkuJ4"
    }
  }
  return new Configuration(params)
}

@NgModule({
  entryComponents: [ConfirmDialogComponent, AccountDialogComponent],
  declarations: [
    AppComponent,
    DomainsComponent,
    ConfirmDialogComponent,
    ConfirmDialogComponent,
    AccountsComponent,
    FabButtonComponent,
    AccountDialogComponent
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
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ApiModule.forRoot(apiConfigFactory)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
