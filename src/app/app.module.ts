import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { LayoutModule } from "@angular/cdk/layout"
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
} from "@angular/material"
import { DomainsComponent } from "./pages/domains/domains.component"
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component"
import { AccountsComponent } from "./pages/accounts/accounts.component"
import { FabButtonComponent } from "./components/fab-button/fab-button.component"
import { AccountDialogComponent } from "./pages/accounts/components/account-dialog/account-dialog.component"
import { HttpClientModule } from "@angular/common/http"

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
    MatPaginatorModule,
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
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
