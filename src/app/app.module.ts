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
  MatCheckboxModule
} from "@angular/material"
import { DomainsComponent } from "./pages/domains/domains.component"
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component"
import { AddressesComponent } from "./pages/addresses/addresses.component"
import { FabButtonComponent } from "./components/fab-button/fab-button.component"
import { AddressDialogComponent } from "./pages/addresses/components/address-dialog/address-dialog.component"

@NgModule({
  entryComponents: [ConfirmDialogComponent, AddressDialogComponent],
  declarations: [
    AppComponent,
    DomainsComponent,
    ConfirmDialogComponent,
    ConfirmDialogComponent,
    AddressesComponent,
    FabButtonComponent,
    AddressDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
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
    FlexLayoutModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSortModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
