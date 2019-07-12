import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { DomainsComponent } from "./pages/domains/domains.component"
import { AddressesComponent } from "./pages/addresses/addresses.component"

const routes: Routes = [
  {
    path: "domains",
    component: DomainsComponent
  },
  {
    path: "addresses",
    component: AddressesComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
