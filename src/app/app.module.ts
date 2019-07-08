import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { LayoutModule } from "@angular/cdk/layout"
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from "@angular/material"
import { HomeComponent } from "./home/home.component"
import { DomainsComponent } from "./domains/domains.component"
import { AdressesComponent } from "./adresses/adresses.component"
import { FiltersComponent } from "./filters/filters.component"
import { DnsComponent } from "./dns/dns.component"

@NgModule({
  declarations: [AppComponent, HomeComponent, DomainsComponent, AdressesComponent, FiltersComponent, DnsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
