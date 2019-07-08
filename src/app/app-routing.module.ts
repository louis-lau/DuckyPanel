import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { DomainsComponent } from "./domains/domains.component"
import { HomeComponent } from "./home/home.component"
import { AdressesComponent } from "./adresses/adresses.component"
import { FiltersComponent } from "./filters/filters.component"
import { DnsComponent } from "./dns/dns.component"

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "domains",
    component: DomainsComponent
  },
  {
    path: "addresses",
    component: AdressesComponent
  },
  {
    path: "filters",
    component: FiltersComponent
  },
  {
    path: "dns",
    component: DnsComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
