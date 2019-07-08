import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { LayoutModule } from "@angular/cdk/layout"
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from "@angular/material"
import { HomeComponent } from "./home/home.component"

@NgModule({
  declarations: [AppComponent, HomeComponent],
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
