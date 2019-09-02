import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { DomainsComponent } from "./pages/domains/domains.component"
import { AccountsComponent } from "./pages/accounts/accounts.component"

const routes: Routes = [
  {
    path: "domains",
    component: DomainsComponent
  },
  {
    path: "accounts",
    component: AccountsComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
