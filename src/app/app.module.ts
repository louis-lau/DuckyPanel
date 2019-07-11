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
  MatTooltipModule
} from "@angular/material"
import { HomeComponent } from "./home/home.component"
import { DomainsComponent, RemoveConfirmDialog } from "./domains/domains.component"
import { AdressesComponent } from "./adresses/adresses.component"
import { FiltersComponent } from "./filters/filters.component"
import { DnsComponent } from "./dns/dns.component"

@NgModule({
  entryComponents: [RemoveConfirmDialog],
  declarations: [
    AppComponent,
    HomeComponent,
    DomainsComponent,
    AdressesComponent,
    FiltersComponent,
    DnsComponent,
    RemoveConfirmDialog
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
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
