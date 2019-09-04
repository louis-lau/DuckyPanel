import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { AccountsComponent } from "./pages/accounts/accounts.component"
import { DomainsComponent } from "./pages/domains/domains.component"

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
